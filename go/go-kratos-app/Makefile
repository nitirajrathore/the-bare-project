PROTO_FILES = $(shell find protos -name '*.proto')

generate-protos:
	protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative $(PROTO_FILES)