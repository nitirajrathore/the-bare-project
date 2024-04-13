package main

import (
	"flag"
	"fmt"
	pbs "go-config/protos"

	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
)

func main7() {
	var configFile string
	flag.StringVar(&configFile, "protoconfig", "configs/protoconfig.json", "config file")
	flag.Parse()

	// Load the config file
	c := config.New(config.WithSource(file.NewSource(configFile)))

	if err := c.Load(); err != nil {
		panic(err)
	}

	var server pbs.Server

	// Unmarshal the config to struct
	c.Scan(&server)

	// fmt.Println("server config:", server)
	// log.Printf("server config: %+v", server)

	fmt.Println("server Port:", server.Port)
	fmt.Println("server Host:", server.Host)

}
