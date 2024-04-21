// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"context"
	"go-mongo/app"
	"go-mongo/internal/repository"
	"go-mongo/internal/services"
	"go-mongo/protos/config"
	"go-mongo/servers"
)

// Injectors from wire.go:

// Initialize Apps
func InitializeApp(ctx *context.Context, config2 *config.Config) *app.App {
	grpcServer := app.NewGrpcServerConfig(config2)
	dbConfig := app.NewDBConfig(config2)
	db := app.NewDB(ctx, dbConfig)
	echoRepository := repository.NewEchoRepository(db)
	echoService := services.NewEchoService(echoRepository)
	serversGrpcServer := servers.NewGrpcServer(grpcServer, echoService)
	httpServer := app.NewOpenAPIServerConfig(config2)
	serversHttpServer := servers.NewHttpServer(httpServer, grpcServer)
	openAPIServer := app.NewHttpServerConfig(config2)
	serversOpenAPIServer := servers.NewOpenAPIServer(openAPIServer, grpcServer)
	appApp := app.NewApp(serversGrpcServer, serversHttpServer, serversOpenAPIServer, db)
	return appApp
}
