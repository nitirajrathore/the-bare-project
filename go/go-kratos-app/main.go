package main

import (
	"context"
	"flag"
	pbs "go-kratos-app/protos"
	"log"
	"strconv"

	kratos "github.com/go-kratos/kratos/v2"
	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
	"github.com/go-kratos/kratos/v2/transport/grpc"
	"github.com/go-kratos/kratos/v2/transport/http"
)

func main() {
	var configFile string
	flag.StringVar(&configFile, "config-file", "configs/app-conf.json", "configuration file path")
	flag.Parse()

	c := config.New(config.WithSource(file.NewSource(configFile)))
	if err := c.Load(); err != nil {
		log.Fatal(err)
	}

	var config pbs.Config

	if err := c.Scan(&config); err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	httpSrv := http.NewServer(http.Address(config.Servers.Http.Host + ":" + strconv.Itoa(int(config.Servers.Http.Port))))
	grpcSrv := grpc.NewServer(grpc.Address(config.Servers.Grpc.Host + ":" + strconv.Itoa(int(config.Servers.Grpc.Port))))
	app := kratos.New(
		kratos.Name(config.App.Name),
		kratos.Server(httpSrv, grpcSrv),
		kratos.Context(ctx),
	)

	log.Println("Starting Application")
	if err := app.Run(); err != nil {
		log.Fatal(err)
	}

	log.Println("Server gracefully stopped")
}
