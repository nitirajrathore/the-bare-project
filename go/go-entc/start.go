package main

import (
	"context"
	"go-entc/ent"
	"log"

	_ "github.com/lib/pq"

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

	CreateUser(ctx, client)
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
