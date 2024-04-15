

Q: How to add the google/apis/annotations.proto so that it is available to your protos. 
A: as per [this](https://stackoverflow.com/questions/66168350/import-google-api-annotations-proto-was-not-found-or-had-errors-how-do-i-add), one way that worked for me was to copy the annotations.proto and http.proto to the root director of my app, like in this commit.

Follow the README.md [here](https://github.com/grpc-ecosystem/grpc-gateway) to generate the gateway code your grpc service.
You will have to run following commands.

```
$ go install \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
    google.golang.org/protobuf/cmd/protoc-gen-go \
    google.golang.org/grpc/cmd/protoc-gen-go-grpc

```
add these file to the root of your project. Download these files from [here](https://github.com/googleapis/googleapis/tree/master/google/api).

```
google/api/annotations.proto
google/api/field_behavior.proto
google/api/http.proto
google/api/httpbody.proto
```

Then generate the proto with grpc and http using
```
	protoc --go_out=. --go_opt=paths=source_relative \
	--go-grpc_out=. --go-grpc_opt=paths=source_relative \
  --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative \
  --grpc-gateway_opt=generate_unbound_methods=true \
	$(PROTO_FILES)%
```

once you run the two servers like below, you should able to make the following curl call to access the http interface exposed by the gateway.

```
# start the grpc server
go run server/main.go

# start the http server
go run http/main.go
```

Make the curl http client call to get json from http server
```
curl -XPOST -d '{"value" : "soemthing"}' localhost:8081/v1/echo
```

Run the grpc client to directly access the grpc server
```
go run client/main.go
```

## Enable OpenAPI endpoints

1. Install https://pkg.go.dev/github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 
```
go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2
```
2. You can follow the instructions given in this file for details : https://vscode.dev/github/nitirajrathore/their_tutorials/blob/main/grpc-gateway-boilerplate/third_party/README.md#L4
I will download the swagger-ui-dist using npm package with following command and then copy the swagger-ui-dist folder from node_modules folder to a directory in your project

```
npm install swagger-ui-dist
```
