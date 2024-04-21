PROTO_FILES = $(shell find protos -name '*.proto')

generate:
	protoc --go_out=. --go_opt=paths=source_relative \
	--go-grpc_out=. --go-grpc_opt=paths=source_relative \
  --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative \
  --grpc-gateway_opt=generate_unbound_methods=true \
	--openapiv2_out=. \
	$(PROTO_FILES)

copy:
	mkdir -p third_party/OpenAPI/echo/v1
	cp -r protos/services/echo.swagger.json third_party/OpenAPI/echo/v1
build: copy
	wire
	go build ./...

all: build generate
	go run .
