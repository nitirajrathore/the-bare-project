package app

import (
	config "go-mongo/protos/config"
)

func NewGrpcServerConfig(conf *config.Config) *config.GrpcServer {
	return conf.Servers.Grpc
}

func NewHttpServerConfig(conf *config.Config) *config.OpenAPIServer {
	return conf.Servers.OpenAPI
}

func NewOpenAPIServerConfig(conf *config.Config) *config.HttpServer {
	return conf.Servers.Http
}

func NewDBConfig(conf *config.Config) *config.DBConfig {
	return conf.Db
}
