This exposes a service called services.Greeter
use the cli tool [grpcurl](https://github.com/fullstorydev/grpcurl) or any other from the list [grpc-ecosystem/awesome-grpc: A curated list of useful resources for gRPC](https://github.com/grpc-ecosystem/awesome-grpc?tab=readme-ov-file#tools) to query the server without a separate grpc client

1. find which services are exposed by the server.
``grpcurl -plaintext localhost:9000 list``
2. send query to grpc server by passing a json, it will internally convert it to the binary rpc call.
``grpcurl -plaintext -d '{"name": "nitiraj"}' localhost:9000 services.Greeter/SayHello``