package servers

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"io/ioutil"
	"mime"
	"net/http"
	"os"
	"strconv"
	"strings"

	config "go-mongo/protos/config"

	services "go-mongo/protos/services"

	"google.golang.org/grpc/credentials/insecure"

	"go-mongo/third_party"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

type OpenAPIServer struct {
	config     *config.OpenAPIServer
	grpcConfig *config.GrpcServer
}

// getOpenAPIHandler serves an OpenAPI UI.
// Adapted from https://github.com/philips/grpc-gateway-example/blob/a269bcb5931ca92be0ceae6130ac27ae89582ecc/cmd/serve.go#L63
func getOpenAPIHandler() http.Handler {
	mime.AddExtensionType(".svg", "image/svg+xml")
	// Use subdirectory in embedded files
	subFS, err := fs.Sub(third_party.OpenAPI, "OpenAPI")
	if err != nil {
		panic("couldn't create sub filesystem: " + err.Error())
	}
	return http.FileServer(http.FS(subFS))
}

func (o *OpenAPIServer) getGrpcServiceEndPoint() string {
	return o.grpcConfig.Host + ":" + strconv.Itoa(int(o.grpcConfig.Port))
}

func (o *OpenAPIServer) getServiceEndpoint() string {
	return o.config.Host + ":" + strconv.Itoa(int(o.config.Port))
}

// NewOpenAPIServer creates a new OpenAPIServer.
func NewOpenAPIServer(serverConfig *config.OpenAPIServer, grpcConfig *config.GrpcServer) *OpenAPIServer {
	return &OpenAPIServer{
		config:     serverConfig,
		grpcConfig: grpcConfig,
	}
}

// Run runs the gRPC-Gateway, dialling the provided address.
func (o *OpenAPIServer) Run(ctx *context.Context) error {
	// Adds gRPC internal logs. This is quite verbose, so adjust as desired!
	log := grpclog.NewLoggerV2(os.Stdout, ioutil.Discard, ioutil.Discard)
	grpclog.SetLoggerV2(log)

	// Create a client connection to the gRPC Server we just started.
	// This is where the gRPC-Gateway proxies the requests.
	conn, err := grpc.DialContext(
		*ctx,
		o.getGrpcServiceEndPoint(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		// grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(insecure.CertPool, "")),
		grpc.WithBlock(),
	)
	if err != nil {
		return fmt.Errorf("failed to dial server: %w", err)
	}

	gwmux := runtime.NewServeMux()
	err = services.RegisterEchoServiceHandler(*ctx, gwmux, conn)
	if err != nil {
		return fmt.Errorf("failed to register gateway: %w", err)
	}

	oa := getOpenAPIHandler()

	gatewayAddr := o.getServiceEndpoint()

	gwServer := &http.Server{
		Addr: gatewayAddr,
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if strings.HasPrefix(r.URL.Path, "/api") {
				gwmux.ServeHTTP(w, r)
				return
			}
			oa.ServeHTTP(w, r)
		}),
	}
	// Empty parameters mean use the TLS Config specified with the server.
	if o.config.ServeHttp == true {
		log.Info("Serving gRPC-Gateway and OpenAPI Documentation on http://", gatewayAddr)
		return fmt.Errorf("serving gRPC-Gateway server: %w", gwServer.ListenAndServe())
	}

	// gwServer.TLSConfig = &tls.Config{
	// 	Certificates: []tls.Certificate{insecure.Cert},
	// }
	// log.Info("Serving gRPC-Gateway and OpenAPI Documentation on http://", gatewayAddr)
	// return fmt.Errorf("serving gRPC-Gateway server: %w", gwServer.ListenAndServe())
	return errors.New("Do not support HTTPS yet in OpenAPIServer.")
}
