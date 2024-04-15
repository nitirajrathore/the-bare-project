package main

import (
	"context"
	"fmt"
	"go-entc/ent"
	"log"
	"time"

	_ "github.com/lib/pq"

	"go-entc/ent/car"
	"go-entc/ent/user"
)

func main() {

	client, err := ent.Open("postgres", "host=localhost port=5432 user=postgres dbname=entdemo password=mysecretpassword sslmode=disable")
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	ctx := context.Background()

	// createSchema(ctx, client)

	// u, err := CreateUser(ctx, client)
	// if err != nil {
	// 	log.Fatalf("failed creating user: %v", err)
	// }

	// u, err := createCars(ctx, client)
	// if err != nil {
	// 	log.Fatalf("failed creating cars: %v", err)
	// }

	// log.Println("Created user with cars : %v", u)

	u, err := client.User.Get(ctx, 3)
	if err != nil {
		log.Fatalf("failed getting user: %v", err)
	}

	err = QueryCars(ctx, u)
	if err != nil {
		log.Fatalf("failed querying cars: %v", err)
	}

}

func createSchema(ctx context.Context, client *ent.Client) {
	if err := client.Schema.Create(ctx); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
}

func CreateUser(ctx context.Context, client *ent.Client) (*ent.User, error) {
	u, err := client.User.
		Create().
		SetAge(30).
		SetName("a8m").
		Save(ctx)
	if err != nil {
		return nil, err
	}
	log.Println("user was created: ", u)
	return u, nil
}

func QueryUser(ctx context.Context, client *ent.Client) (*ent.User, error) {
	u, err := client.User.
		Query().
		Where(user.Name("a8m")).
		Only(ctx)
	if err != nil {
		return nil, err
	}
	log.Println("user was queried: ", u)
	return u, nil
}

func createCars(ctx context.Context, client *ent.Client) (*ent.User, error) {
	fmt.Println("inside createCars")
	tesla, err := client.Car.
		Create().
		SetModel("tesla").
		SetRegisteredAt(time.Now()).
		Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("Failed creating car: %v", err)
	}

	log.Println("car was created: ", tesla)

	ford, err := client.Car.
		Create().
		SetModel("ford").
		SetRegisteredAt(time.Now()).
		Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("Failed creating car: %v", err)
	}

	log.Println("car was created: ", ford)

	a8m, err := client.User.
		Create().
		SetAge(30).
		AddCars(tesla, ford).
		Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("Failed creating user: %v", err)
	}

	log.Println("user was created: ", a8m)

	fmt.Println("createCars finished")
	return a8m, nil
}

func QueryCars(ctx context.Context, a8m *ent.User) error {
	cars, err := a8m.QueryCars().All(ctx)
	if err != nil {
		return fmt.Errorf("failed querying cars: %v", err)
	}

	log.Println("queried cars: ", cars)

	ford, err := a8m.QueryCars().
		Where(car.Model("ford")).
		Only(ctx)

	if err != nil {
		return fmt.Errorf("failed querying car: %v", err)
	}

	log.Println("queried car: ", ford)
	return nil
}
