package main

import (
	"context"
	"fmt"
	"go-entc/ent"
	"log"
	"time"

	_ "github.com/lib/pq"

	"go-entc/ent/car"
	"go-entc/ent/group"
	"go-entc/ent/user"
)

func main() {

	client, err := ent.Open("postgres", "host=localhost port=5432 user=postgres dbname=entdemo password=mysecretpassword sslmode=disable")
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	ctx := context.Background()

	createSchema(ctx, client)

	// u, err := CreateUser(ctx, client)
	// if err != nil {
	// 	log.Fatalf("failed creating user: %v", err)
	// }

	// u, err := createCars(ctx, client)
	// if err != nil {
	// 	log.Fatalf("failed creating cars: %v", err)
	// }

	// log.Println("Created user with cars : %v", u)

	// u, err := client.User.Get(ctx, 3)
	// if err != nil {
	// 	log.Fatalf("failed getting user: %v", err)
	// }

	// err = QueryCars(ctx, u)
	// if err != nil {
	// 	log.Fatalf("failed querying cars: %v", err)
	// }

	// err = QueryCarUsers(ctx, u)
	// if err != nil {
	// 	log.Fatalf("failed querying car users: %v", err)
	// }

	err = CreateGraph(ctx, client)
	if err != nil {
		log.Fatalf("failed creating graph: %v", err)
	}

	err = QueryGithub(ctx, client)
	if err != nil {
		log.Fatalf("failed querying github: %v", err)
	}

	err = QueryArielCars(ctx, client)
	if err != nil {
		log.Fatalf("failed querying ariel cars: %v", err)
	}

	err = QueryGroupWithUsers(ctx, client)
	if err != nil {
		log.Fatalf("failed querying group with users: %v", err)
	}
}

func QueryGroupWithUsers(ctx context.Context, client *ent.Client) error {
	groups, err := client.Group.
		Query().
		Where(group.HasUsers()).
		All(ctx)
	if err != nil {
		return fmt.Errorf("failed getting groups: %w", err)
	}
	log.Println("groups returned:", groups)
	// Output: (Group(Name=GitHub), Group(Name=GitLab),)
	return nil
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
		SetName("nitiraj").
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

func QueryCarUsers(ctx context.Context, a8m *ent.User) error {
	cars, err := a8m.QueryCars().All(ctx)

	if err != nil {
		return fmt.Errorf("failed querying cars: %v", err)
	}

	log.Println("queried cars: ", cars)

	for _, c := range cars {
		owner, err := c.QueryOwner().Only(ctx)
		if err != nil {
			return fmt.Errorf("failed querying owner: %v", err)
		}
		log.Printf("cat %q owner: %q\n", c.Model, owner.Name)
	}

	return nil
}

func CreateGraph(ctx context.Context, client *ent.Client) error {
	// First, create the users.
	a8m, err := client.User.
		Create().
		SetAge(30).
		SetName("Ariel").
		Save(ctx)
	if err != nil {
		return err
	}
	neta, err := client.User.
		Create().
		SetAge(28).
		SetName("Neta").
		Save(ctx)
	if err != nil {
		return err
	}
	// Then, create the cars, and attach them to the users created above.
	err = client.Car.
		Create().
		SetModel("Tesla").
		SetRegisteredAt(time.Now()).
		// Attach this car to Ariel.
		SetOwner(a8m).
		Exec(ctx)
	if err != nil {
		return err
	}
	err = client.Car.
		Create().
		SetModel("Mazda").
		SetRegisteredAt(time.Now()).
		// Attach this car to Ariel.
		SetOwner(a8m).
		Exec(ctx)
	if err != nil {
		return err
	}
	err = client.Car.
		Create().
		SetModel("Ford").
		SetRegisteredAt(time.Now()).
		// Attach this car to Neta.
		SetOwner(neta).
		Exec(ctx)
	if err != nil {
		return err
	}
	// Create the groups, and add their users in the creation.
	err = client.Group.
		Create().
		SetName("GitLab").
		AddUsers(neta, a8m).
		Exec(ctx)
	if err != nil {
		return err
	}
	err = client.Group.
		Create().
		SetName("GitHub").
		AddUsers(a8m).
		Exec(ctx)
	if err != nil {
		return err
	}
	log.Println("The graph was created successfully")
	return nil
}

func QueryGithub(ctx context.Context, client *ent.Client) error {
	cars, err := client.Group.
		Query().
		Where(group.Name("GitHub")). // (Group(Name=GitHub),)
		QueryUsers().                // (User(Name=Ariel, Age=30),)
		QueryCars().                 // (Car(Model=Tesla, RegisteredAt=<Time>), Car(Model=Mazda, RegisteredAt=<Time>),)
		All(ctx)
	if err != nil {
		return fmt.Errorf("failed getting cars: %w", err)
	}
	log.Println("cars returned:", cars)
	// Output: (Car(Model=Tesla, RegisteredAt=<Time>), Car(Model=Mazda, RegisteredAt=<Time>),)
	return nil
}

func QueryArielCars(ctx context.Context, client *ent.Client) error {
	// Get "Ariel" from previous steps.
	a8m := client.User.
		Query().
		Where(
			user.HasCars(),
			user.Name("Ariel"),
		).
		OnlyX(ctx)
	cars, err := a8m. // Get the groups, that a8m is connected to:
				QueryGroups(). // (Group(Name=GitHub), Group(Name=GitLab),)
				QueryUsers().  // (User(Name=Ariel, Age=30), User(Name=Neta, Age=28),)
				QueryCars().   //
				Where(         //
			car.Not( //  Get Neta and Ariel cars, but filter out
				car.Model("Mazda"), //  those who named "Mazda"
			), //
		). //
		All(ctx)
	if err != nil {
		return fmt.Errorf("failed getting cars: %w", err)
	}
	log.Println("cars returned:", cars)
	// Output: (Car(Model=Tesla, RegisteredAt=<Time>), Car(Model=Ford, RegisteredAt=<Time>),)
	return nil
}
