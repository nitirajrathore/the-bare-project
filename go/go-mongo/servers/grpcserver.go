package servers

import (
	"context"
	config "go-mongo/protos/config"
	services "go-mongo/protos/services"
	"go-mongo/utils"
	"log"
	"net"
	"strconv"

	internalServices "go-mongo/internal/services"

	"google.golang.org/grpc"
	// "github.com/go-kratos/kratos/v2/transport/grpc"
)

type GrpcServer struct {
	serverConfig        *config.GrpcServer
	internalEchoService *internalServices.EchoService
}

func NewGrpcServer(grpcConfig *config.GrpcServer, es *internalServices.EchoService) *GrpcServer {
	return &GrpcServer{
		serverConfig:        grpcConfig,
		internalEchoService: es,
	}
}

type echoServer struct {
	services.UnimplementedEchoServiceServer
	es *internalServices.EchoService
}

func (s *echoServer) Echo(ctx context.Context, in *services.EchoMessage) (*services.EchoMessage, error) {
	log.Printf("Received: %v", in.GetValue())

	echoReponse, err := s.es.OnEchoReceived(&ctx, utils.ProtoToEcho(in))

	return utils.EchoToProto(echoReponse), err
}

func (g *GrpcServer) getServiceEndPoint() string {
	return g.serverConfig.Host + ":" + strconv.Itoa(int(g.serverConfig.Port))
}

func (g *GrpcServer) Run(ctx *context.Context) error {
	addr := g.getServiceEndPoint()
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	s := grpc.NewServer()

	// grpcSrv := grpc.NewServer(grpc.Address("localhost:9000"))

	var srv echoServer = echoServer{es: g.internalEchoService}

	services.RegisterEchoServiceServer(s, &srv)

	s.Serve(lis)
	// log.Fatal()

	//log.Println("Server gracefully stopped")
	return nil
}
