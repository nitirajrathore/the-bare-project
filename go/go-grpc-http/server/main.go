package main

import (
	"context"
	services "go-grpc-http/protos"
	"log"
	"net"

	"google.golang.org/grpc"
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
	// var configFile string
	// flag.StringVar(&configFile, "config-file", "configs/app-conf.yaml", "configuration file path")
	// flag.Parse()

	// c := config.New(config.WithSource(file.NewSource(configFile)))
	// if err := c.Load(); err != nil {
	// 	log.Fatal(err)
	// }

	// var config protoConfig.Config

	// if err := c.Scan(&config); err != nil {
	// 	log.Fatal(err)
	// }

	// ctx, cancel := context.WithCancel(context.Background())
	// defer cancel()

	// httpSrv := http.NewServer(http.Address(config.Servers.Http.Host + ":" + strconv.Itoa(int(config.Servers.Http.Port))))

	addr := "0.0.0.0:10000"
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	s := grpc.NewServer(
	// TODO: Replace with your own certificate!
	// grpc.Creds(credentials.NewServerTLSFromCert(&insecure.Cert)),
	)

	// grpcSrv := grpc.NewServer(grpc.Address("localhost:9000"))

	var srv server

	services.RegisterEchoServiceServer(s, &srv)

	s.Serve(lis)

	log.Println("Server gracefully stopped")
}
