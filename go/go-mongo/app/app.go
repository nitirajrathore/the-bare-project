package app

// echoRepository "go-mongo/reposotory/echo"

import (
	"context"
	"go-mongo/internal/db"
	"go-mongo/protos/config"
	"go-mongo/servers"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

// Replace "path/to/HttpServer" with the actual import path

type App struct {
	GrpcServer    *servers.GrpcServer
	HttpServer    *servers.HttpServer
	OpenAPIServer *servers.OpenAPIServer
	Db            *db.Db
}

func NewApp(grpcServer *servers.GrpcServer, httpServer *servers.HttpServer, openAPIServer *servers.OpenAPIServer, db *db.Db) *App {
	return &App{
		GrpcServer:    grpcServer,
		HttpServer:    httpServer,
		OpenAPIServer: openAPIServer,
		Db:            db,
		// echoRepository: EchoRepository,
	}
}

func NewMongoConfig(dbconfig *config.DBConfig) *db.MongoConfig {
	return &db.MongoConfig{DbName: dbconfig.DbName, MessageCollection: dbconfig.MessageCollection}
}

func NewDB(ctx *context.Context, dbconfig *config.DBConfig) *db.Db {
	clientOptions := options.Client().ApplyURI(dbconfig.ConnectionURI)

	client, err := mongo.Connect(*ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	return &db.Db{
		MongoConfig: NewMongoConfig(dbconfig),
		DbClient:    client,
	}
}
