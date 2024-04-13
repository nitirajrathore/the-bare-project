package main

import (
	"log"

	kratos "github.com/go-kratos/kratos/v2"
	"github.com/go-kratos/kratos/v2/transport/grpc"
	"github.com/go-kratos/kratos/v2/transport/http"
)

func main() {
	httpSrv := http.NewServer(http.Address(":8000"))
	grpcSrv := grpc.NewServer(grpc.Address(":9000"))
	app := kratos.New(
		kratos.Name("go-kratos-app"),
		kratos.Server(httpSrv, grpcSrv),
	)
	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
