package main

import (
	"context"
	services "go-grpc-http/protos"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	// "github.com/go-kratos/kratos/v2/transport/grpc"
)

type server struct {
	services.UnimplementedEchoServiceServer
}

func (s *server) Echo(ctx context.Context, in *services.EchoMessage) (*services.EchoMessage, error) {
	log.Printf("Received: %v", in.GetValue())
	return &services.EchoMessage{Value: "Hello " + in.GetValue()}, nil
}

func main() {
	g, err := grpc.NewClient("localhost:10000", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal(err)
	}

	c := services.NewEchoServiceClient(g)

	reply, err := c.Echo(context.Background(), &services.EchoMessage{Value: "Hello World"})
	if err != nil {
		log.Fatal(err)
	}

	log.Println(reply.GetValue())
}
