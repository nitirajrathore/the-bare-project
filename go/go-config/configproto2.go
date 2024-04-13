package main

import (
	"flag"
	"fmt"
	pbs "go-config/protos"

	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
)

func main() {
	var configFile string
	flag.StringVar(&configFile, "protoconfig", "configs/protoconfig-full.json", "config file")
	flag.Parse()

	// Load the config file
	c := config.New(config.WithSource(file.NewSource(configFile)))

	if err := c.Load(); err != nil {
		panic(err)
	}

	var conf pbs.Configs

	// Unmarshal the config to struct
	c.Scan(&conf)

	// fmt.Println("server config:", server)
	// log.Printf("server config: %+v", server)

	fmt.Println("grpc Port:", conf.Servers.Grpc.Server.Port)
	fmt.Println("http Host:", conf.Servers.Http.Server.Host)

}
