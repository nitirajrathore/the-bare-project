package repository

import (
	"context"
	"go-mongo/internal/db"
	"go-mongo/internal/entity"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	mongo "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// EchoRepository is a repository for echo messages

type EchoRepository struct {
	dbInfo            *db.Db
	messageCollection *mongo.Collection
}

func NewEchoRepository(dbInfo *db.Db) *EchoRepository {
	collection := dbInfo.DbClient.Database(dbInfo.MongoConfig.DbName).Collection(dbInfo.MongoConfig.MessageCollection)
	return &EchoRepository{
		dbInfo:            dbInfo,
		messageCollection: collection,
	}
}

func (er *EchoRepository) AddEcho(ctx *context.Context, echo *entity.Echo) (*entity.Echo, error) {
	insertOneResult, err := er.messageCollection.InsertOne(*ctx, echo)
	if err != nil {
		return nil, err
	}
	if oid, ok := insertOneResult.InsertedID.(primitive.ObjectID); ok {
		echo.ID = oid.Hex()
	}

	return echo, nil
}

func (er *EchoRepository) UpdateEcho(ctx *context.Context, echo *entity.Echo) error {
	singleResult := er.messageCollection.FindOneAndReplace(*ctx, bson.M{"_id": echo.ID}, echo)

	return singleResult.Err()
}

func (er *EchoRepository) DeleteEcho(ctx *context.Context, id string) error {
	deleteResult, err := er.messageCollection.DeleteOne(*ctx, bson.M{"_id": id})

	if err != nil {
		return err
	}

	if deleteResult.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

// UpdateMessage updates a message in the MongoDB collection based on its ID
func (er *EchoRepository) UpdateMessage(ctx *context.Context, echo entity.Echo) (entity.Echo, error) {
	filter := bson.M{"_id": echo.ID}
	updateQuery := bson.M{"$set": bson.M{"content": echo.Message}}

	// Update the message in the MongoDB collection
	result := er.messageCollection.FindOneAndUpdate(*ctx, filter, updateQuery, options.FindOneAndUpdate().SetReturnDocument(options.After))
	if result.Err() != nil {
		log.Println("Failed to update message:", result.Err())
		return entity.Echo{}, result.Err()
	}

	// Decode the updated message from the result
	var updatedMessage entity.Echo
	if err := result.Decode(&updatedMessage); err != nil {
		log.Println("Failed to decode updated message:", err)
		return entity.Echo{}, err
	}

	log.Println("Message updated successfully:", updatedMessage.ID)

	return updatedMessage, nil
}

// func doDBAction(client *mongo.Client) {
// 	collection := client.Database("test").Collection("restaurants")
// 	ctx := context.Background()

// 	// Insert
// 	restaurant := entity.Echo{
// 		Message:         "My Restaurant",
// 		Time:
// 	}
// 	res, err := collection.InsertOne(ctx, restaurant)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Println(res.InsertedID)

// 	// Find
// 	cursor, err := collection.Find(ctx, map[string]interface{}{"borough": "Manhattan"})
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		var r entity.Restaurant
// 		err := cursor.Decode(&r)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		fmt.Println(r)
// 	}

// 	// Update
// 	_, err = collection.UpdateOne(ctx, map[string]interface{}{"restaurant_id": "123"}, map[string]interface{}{"$set": map[string]interface{}{"cuisine": "American"}})
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	// Delete
// 	_, err = collection.DeleteOne(ctx, map[string]interface{}{"restaurant_id": "123"})
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// }
