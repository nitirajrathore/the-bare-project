package main

import (
	"context"
	"flag"
	conf "go-mongo/protos/config"

	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
)

func readConfigs() *conf.Config {
	var configFile string
	flag.StringVar(&configFile, "config-file", "config/config.yaml", "config file")
	flag.Parse()

	// Load the config file
	c := config.New(config.WithSource(file.NewSource(configFile)))

	if err := c.Load(); err != nil {
		panic(err)
	}

	var conf conf.Config

	// Unmarshal the config to struct
	c.Scan(&conf)

	return &conf
}

func main() {

	ctx := context.Background()
	c := readConfigs()
	app := InitializeApp(&ctx, c)
	go func() { app.GrpcServer.Run(&ctx) }()
	go func() { app.HttpServer.Run(&ctx) }()
	go func() { app.OpenAPIServer.Run(&ctx) }()

	ch := make(chan struct{})

	<-ch
}
