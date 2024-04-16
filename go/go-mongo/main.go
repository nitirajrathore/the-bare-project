package main

import (
	"context"
	"fmt"
	"log"

	entity "go-mongo/entity"

	mongo "go.mongodb.org/mongo-driver/mongo"
	options "go.mongodb.org/mongo-driver/mongo/options"
)

func connect() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	return client
}

func main() {
	client := connect()
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}()

	collection := client.Database("test").Collection("restaurants")
	ctx := context.Background()

	// Insert
	restaurant := entity.Restaurant{
		Name:         "My Restaurant",
		RestaurantId: "123",
		Cuisine:      "Italian",
		Address:      map[string]string{"street": "123 Main St", "city": "New York"},
		Borough:      "Manhattan",
		Grades:       []interface{}{map[string]interface{}{"grade": "A", "score": 10}},
	}
	res, err := collection.InsertOne(ctx, restaurant)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(res.InsertedID)

	// Find
	cursor, err := collection.Find(ctx, map[string]interface{}{"borough": "Manhattan"})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var r entity.Restaurant
		err := cursor.Decode(&r)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(r)
	}

	// Update
	_, err = collection.UpdateOne(ctx, map[string]interface{}{"restaurant_id": "123"}, map[string]interface{}{"$set": map[string]interface{}{"cuisine": "American"}})
	if err != nil {
		log.Fatal(err)
	}

	// Delete
	_, err = collection.DeleteOne(ctx, map[string]interface{}{"restaurant_id": "123"})
	if err != nil {
		log.Fatal(err)
	}
}
