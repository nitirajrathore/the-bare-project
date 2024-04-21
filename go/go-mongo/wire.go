// Wire will generate the wire_gen.go file
//go:build wireinject
// +build wireinject

package main

import (
	"context"
	"github.com/google/wire"
	"go-mongo/app"
	repo "go-mongo/internal/repository"
	internalServices "go-mongo/internal/services"
	config "go-mongo/protos/config"
	"go-mongo/servers"
)

// Initialize Apps
func InitializeApp(ctx *context.Context, config *config.Config) *app.App {
	wire.Build(app.NewGrpcServerConfig, app.NewHttpServerConfig, app.NewOpenAPIServerConfig, app.NewDBConfig,
		servers.NewGrpcServer, servers.NewHttpServer, servers.NewOpenAPIServer, app.NewApp, app.NewDB, repo.NewEchoRepository, internalServices.NewEchoService)

	return &app.App{}
}
