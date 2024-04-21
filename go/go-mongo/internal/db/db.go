package db

import (
	mongo "go.mongodb.org/mongo-driver/mongo"
)

type Db struct {
	MongoConfig *MongoConfig
	DbClient    *mongo.Client
}
