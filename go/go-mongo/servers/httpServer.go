package servers

import (
	"context"
	"net/http"
	"strconv"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	config "go-mongo/protos/config"
	services "go-mongo/protos/services"
)

type HttpServer struct {
	serverConfig *config.HttpServer
	grpcConfig   *config.GrpcServer
}

func NewHttpServer(serverConfig *config.HttpServer, grpcConfig *config.GrpcServer) *HttpServer {
	return &HttpServer{
		serverConfig: serverConfig,
		grpcConfig:   grpcConfig,
	}
}

func (s *HttpServer) getServiceEndPoint() string {
	return s.serverConfig.Host + ":" + strconv.Itoa(int(s.serverConfig.Port))
}

func (s *HttpServer) getGrpcEndPoint() string {
	return s.grpcConfig.Host + ":" + strconv.Itoa(int(s.grpcConfig.Port))
}

func (s *HttpServer) Run(ctx *context.Context) error {
	// Register gRPC server endpoint
	// Note: Make sure the gRPC server is running properly and accessible
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	err := services.RegisterEchoServiceHandlerFromEndpoint(*ctx, mux, s.getGrpcEndPoint(), opts)
	if err != nil {
		return err
	}

	// Start HTTP server (and proxy calls to gRPC server endpoint)
	return http.ListenAndServe(s.getServiceEndPoint(), mux)
}
