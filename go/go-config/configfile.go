package main

import (
	"fmt"
	"log"

	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
)

func main6() {
	jsonfile := "configs/config2.json"
	yamlfile := "configs/config.yaml"
	c := config.New(
		config.WithSource(
			file.NewSource(jsonfile),
			file.NewSource(yamlfile),
		),
	)

	// We missed loading the configs
	if err := c.Load(); err != nil {
		panic(err)
	}

	var v struct {
		Name    string `json:"name"`
		Version string `json:"version"`
	}

	var s struct {
		Service struct {
			Name    string `json:"name"`
			Version string `json:"version"`
		} `json:"service"`
	}

	// Unmarshal the config to struct
	if err := c.Scan(&v); err != nil {
		panic(err)
	}
	fmt.Println("config:", v)
	log.Printf("config: %+v", v)

	fmt.Println("configs : ", c.Value("name"))

	if err := c.Scan(&s); err != nil {
		panic(err)
	}

	fmt.Println("service config:", s)
	log.Printf("service config: %+v", s)

	fmt.Println("service.name : ", c.Value("grpc.server.address"))

	add, _ := c.Value("grpc.server.address").String()

	fmt.Println("service.address  : ", add)

}
