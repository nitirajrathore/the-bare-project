package main

import (
	"flag"
	"log"

	"github.com/go-kratos/kratos/v2/config"
	"github.com/go-kratos/kratos/v2/config/file"
)

var configfile string

func init() {
	flag.StringVar(&configfile, "conf-file", "config.yaml", "config path, eg: -conf config.yaml")
}

// working example for both config.yaml and config.json
func main5() {
	flag.Parse()
	c := config.New(
		config.WithSource(
			file.NewSource(configfile),
		),
	)
	if err := c.Load(); err != nil {
		panic(err)
	}

	// Defines the config JSON Field
	var v struct {
		Name    string `json:"name"`
		Version string `json:"version"`
	}

	// Unmarshal the config to struct
	if err := c.Scan(&v); err != nil {
		panic(err)
	}
	log.Printf("config: %+v", v)

	// Get a value associated with the key
	name, err := c.Value("name").String()
	if err != nil {
		panic(err)
	}
	log.Printf("name: %s", name)

	// watch key
	if err := c.Watch("name", func(key string, value config.Value) {
		log.Printf("config changed: %s = %v\n", key, value)
	}); err != nil {
		panic(err)
	}

	<-make(chan struct{})
}
