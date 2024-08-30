package main

import (
	context "context"
	"flag"
	protoConfig "go-kratos-app/protos/config"

	services "go-kratos-app/protos/services"
	"log"
	"strconv"

	kratos "github.com/go-kratos/kratos/v2"
	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
	"github.com/go-kratos/kratos/v2/transport/grpc"
	"github.com/go-kratos/kratos/v2/transport/http"
)

type server struct {
	services.UnimplementedGreeterServer
}

func (s *server) SayHello(ctx context.Context, in *services.HelloRequest) (*services.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &services.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func (s *server) HelloWorld(ctx context.Context, in *services.EmptyRequest) (*services.HelloReply, error) {
	log.Printf("Received: helloworld")
	return &services.HelloReply{Message: "Hello World"}, nil
}

func main() {
	var configFile string
	flag.StringVar(&configFile, "config-file", "configs/app-conf.yaml", "configuration file path")
	flag.Parse()

	c := config.New(config.WithSource(file.NewSource(configFile)))
	if err := c.Load(); err != nil {
		log.Fatal(err)
	}

	var config protoConfig.Config

	if err := c.Scan(&config); err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	httpSrv := http.NewServer(http.Address(config.Servers.Http.Host + ":" + strconv.Itoa(int(config.Servers.Http.Port))))
	grpcSrv := grpc.NewServer(grpc.Address(config.Servers.Grpc.Host + ":" + strconv.Itoa(int(config.Servers.Grpc.Port))))

	var srv server

	services.RegisterGreeterServer(grpcSrv, &srv)

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
