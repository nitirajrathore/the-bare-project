// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.26.1
// source: protos/configs.proto

package go_config_protos

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Server struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Host string `protobuf:"bytes,1,opt,name=host,proto3" json:"host,omitempty"`
	Port int32  `protobuf:"varint,2,opt,name=port,proto3" json:"port,omitempty"`
}

func (x *Server) Reset() {
	*x = Server{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Server) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Server) ProtoMessage() {}

func (x *Server) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Server.ProtoReflect.Descriptor instead.
func (*Server) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{0}
}

func (x *Server) GetHost() string {
	if x != nil {
		return x.Host
	}
	return ""
}

func (x *Server) GetPort() int32 {
	if x != nil {
		return x.Port
	}
	return 0
}

type HttpServer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Server *Server `protobuf:"bytes,1,opt,name=server,proto3" json:"server,omitempty"`
}

func (x *HttpServer) Reset() {
	*x = HttpServer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *HttpServer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*HttpServer) ProtoMessage() {}

func (x *HttpServer) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use HttpServer.ProtoReflect.Descriptor instead.
func (*HttpServer) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{1}
}

func (x *HttpServer) GetServer() *Server {
	if x != nil {
		return x.Server
	}
	return nil
}

type GrpcServer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Server *Server `protobuf:"bytes,1,opt,name=server,proto3" json:"server,omitempty"`
}

func (x *GrpcServer) Reset() {
	*x = GrpcServer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GrpcServer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GrpcServer) ProtoMessage() {}

func (x *GrpcServer) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GrpcServer.ProtoReflect.Descriptor instead.
func (*GrpcServer) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{2}
}

func (x *GrpcServer) GetServer() *Server {
	if x != nil {
		return x.Server
	}
	return nil
}

type Servers struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Http *HttpServer `protobuf:"bytes,1,opt,name=http,proto3" json:"http,omitempty"`
	Grpc *GrpcServer `protobuf:"bytes,2,opt,name=grpc,proto3" json:"grpc,omitempty"`
}

func (x *Servers) Reset() {
	*x = Servers{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Servers) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Servers) ProtoMessage() {}

func (x *Servers) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Servers.ProtoReflect.Descriptor instead.
func (*Servers) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{3}
}

func (x *Servers) GetHttp() *HttpServer {
	if x != nil {
		return x.Http
	}
	return nil
}

func (x *Servers) GetGrpc() *GrpcServer {
	if x != nil {
		return x.Grpc
	}
	return nil
}

type Database struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Host     string `protobuf:"bytes,1,opt,name=host,proto3" json:"host,omitempty"`
	Port     int32  `protobuf:"varint,2,opt,name=port,proto3" json:"port,omitempty"`
	Username string `protobuf:"bytes,3,opt,name=username,proto3" json:"username,omitempty"`
	Password string `protobuf:"bytes,4,opt,name=password,proto3" json:"password,omitempty"`
	Database string `protobuf:"bytes,5,opt,name=database,proto3" json:"database,omitempty"`
}

func (x *Database) Reset() {
	*x = Database{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Database) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Database) ProtoMessage() {}

func (x *Database) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Database.ProtoReflect.Descriptor instead.
func (*Database) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{4}
}

func (x *Database) GetHost() string {
	if x != nil {
		return x.Host
	}
	return ""
}

func (x *Database) GetPort() int32 {
	if x != nil {
		return x.Port
	}
	return 0
}

func (x *Database) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *Database) GetPassword() string {
	if x != nil {
		return x.Password
	}
	return ""
}

func (x *Database) GetDatabase() string {
	if x != nil {
		return x.Database
	}
	return ""
}

type MessageQueue struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Topic string `protobuf:"bytes,1,opt,name=topic,proto3" json:"topic,omitempty"`
}

func (x *MessageQueue) Reset() {
	*x = MessageQueue{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MessageQueue) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MessageQueue) ProtoMessage() {}

func (x *MessageQueue) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MessageQueue.ProtoReflect.Descriptor instead.
func (*MessageQueue) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{5}
}

func (x *MessageQueue) GetTopic() string {
	if x != nil {
		return x.Topic
	}
	return ""
}

type Logging struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Level string `protobuf:"bytes,1,opt,name=level,proto3" json:"level,omitempty"`
}

func (x *Logging) Reset() {
	*x = Logging{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Logging) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Logging) ProtoMessage() {}

func (x *Logging) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Logging.ProtoReflect.Descriptor instead.
func (*Logging) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{6}
}

func (x *Logging) GetLevel() string {
	if x != nil {
		return x.Level
	}
	return ""
}

type Configs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Servers      *Servers      `protobuf:"bytes,1,opt,name=servers,proto3" json:"servers,omitempty"`
	Database     *Database     `protobuf:"bytes,2,opt,name=database,proto3" json:"database,omitempty"`
	MessageQueue *MessageQueue `protobuf:"bytes,3,opt,name=messageQueue,proto3" json:"messageQueue,omitempty"`
	Logging      *Logging      `protobuf:"bytes,4,opt,name=logging,proto3" json:"logging,omitempty"`
}

func (x *Configs) Reset() {
	*x = Configs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protos_configs_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Configs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Configs) ProtoMessage() {}

func (x *Configs) ProtoReflect() protoreflect.Message {
	mi := &file_protos_configs_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Configs.ProtoReflect.Descriptor instead.
func (*Configs) Descriptor() ([]byte, []int) {
	return file_protos_configs_proto_rawDescGZIP(), []int{7}
}

func (x *Configs) GetServers() *Servers {
	if x != nil {
		return x.Servers
	}
	return nil
}

func (x *Configs) GetDatabase() *Database {
	if x != nil {
		return x.Database
	}
	return nil
}

func (x *Configs) GetMessageQueue() *MessageQueue {
	if x != nil {
		return x.MessageQueue
	}
	return nil
}

func (x *Configs) GetLogging() *Logging {
	if x != nil {
		return x.Logging
	}
	return nil
}

var File_protos_configs_proto protoreflect.FileDescriptor

var file_protos_configs_proto_rawDesc = []byte{
	0x0a, 0x14, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2f, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x73,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x22, 0x30,
	0x0a, 0x06, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x6f, 0x73, 0x74,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04,
	0x70, 0x6f, 0x72, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x04, 0x70, 0x6f, 0x72, 0x74,
	0x22, 0x34, 0x0a, 0x0a, 0x48, 0x74, 0x74, 0x70, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x12, 0x26,
	0x0a, 0x06, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x52, 0x06,
	0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x22, 0x34, 0x0a, 0x0a, 0x47, 0x72, 0x70, 0x63, 0x53, 0x65,
	0x72, 0x76, 0x65, 0x72, 0x12, 0x26, 0x0a, 0x06, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x53, 0x65,
	0x72, 0x76, 0x65, 0x72, 0x52, 0x06, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x22, 0x59, 0x0a, 0x07,
	0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x12, 0x26, 0x0a, 0x04, 0x68, 0x74, 0x74, 0x70, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x48,
	0x74, 0x74, 0x70, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x52, 0x04, 0x68, 0x74, 0x74, 0x70, 0x12,
	0x26, 0x0a, 0x04, 0x67, 0x72, 0x70, 0x63, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x47, 0x72, 0x70, 0x63, 0x53, 0x65, 0x72, 0x76, 0x65,
	0x72, 0x52, 0x04, 0x67, 0x72, 0x70, 0x63, 0x22, 0x86, 0x01, 0x0a, 0x08, 0x44, 0x61, 0x74, 0x61,
	0x62, 0x61, 0x73, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x6f, 0x72, 0x74,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x04, 0x70, 0x6f, 0x72, 0x74, 0x12, 0x1a, 0x0a, 0x08,
	0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08,
	0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x73, 0x73,
	0x77, 0x6f, 0x72, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x61, 0x73, 0x73,
	0x77, 0x6f, 0x72, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x64, 0x61, 0x74, 0x61, 0x62, 0x61, 0x73, 0x65,
	0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x64, 0x61, 0x74, 0x61, 0x62, 0x61, 0x73, 0x65,
	0x22, 0x24, 0x0a, 0x0c, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x51, 0x75, 0x65, 0x75, 0x65,
	0x12, 0x14, 0x0a, 0x05, 0x74, 0x6f, 0x70, 0x69, 0x63, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x05, 0x74, 0x6f, 0x70, 0x69, 0x63, 0x22, 0x1f, 0x0a, 0x07, 0x4c, 0x6f, 0x67, 0x67, 0x69, 0x6e,
	0x67, 0x12, 0x14, 0x0a, 0x05, 0x6c, 0x65, 0x76, 0x65, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x05, 0x6c, 0x65, 0x76, 0x65, 0x6c, 0x22, 0xc7, 0x01, 0x0a, 0x07, 0x43, 0x6f, 0x6e, 0x66,
	0x69, 0x67, 0x73, 0x12, 0x29, 0x0a, 0x07, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x53, 0x65,
	0x72, 0x76, 0x65, 0x72, 0x73, 0x52, 0x07, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x12, 0x2c,
	0x0a, 0x08, 0x64, 0x61, 0x74, 0x61, 0x62, 0x61, 0x73, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x10, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x44, 0x61, 0x74, 0x61, 0x62, 0x61,
	0x73, 0x65, 0x52, 0x08, 0x64, 0x61, 0x74, 0x61, 0x62, 0x61, 0x73, 0x65, 0x12, 0x38, 0x0a, 0x0c,
	0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x51, 0x75, 0x65, 0x75, 0x65, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x14, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2e, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x51, 0x75, 0x65, 0x75, 0x65, 0x52, 0x0c, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x51, 0x75, 0x65, 0x75, 0x65, 0x12, 0x29, 0x0a, 0x07, 0x6c, 0x6f, 0x67, 0x67, 0x69, 0x6e,
	0x67, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73,
	0x2e, 0x4c, 0x6f, 0x67, 0x67, 0x69, 0x6e, 0x67, 0x52, 0x07, 0x6c, 0x6f, 0x67, 0x67, 0x69, 0x6e,
	0x67, 0x42, 0x12, 0x5a, 0x10, 0x67, 0x6f, 0x2d, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_protos_configs_proto_rawDescOnce sync.Once
	file_protos_configs_proto_rawDescData = file_protos_configs_proto_rawDesc
)

func file_protos_configs_proto_rawDescGZIP() []byte {
	file_protos_configs_proto_rawDescOnce.Do(func() {
		file_protos_configs_proto_rawDescData = protoimpl.X.CompressGZIP(file_protos_configs_proto_rawDescData)
	})
	return file_protos_configs_proto_rawDescData
}

var file_protos_configs_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_protos_configs_proto_goTypes = []interface{}{
	(*Server)(nil),       // 0: protos.Server
	(*HttpServer)(nil),   // 1: protos.HttpServer
	(*GrpcServer)(nil),   // 2: protos.GrpcServer
	(*Servers)(nil),      // 3: protos.Servers
	(*Database)(nil),     // 4: protos.Database
	(*MessageQueue)(nil), // 5: protos.MessageQueue
	(*Logging)(nil),      // 6: protos.Logging
	(*Configs)(nil),      // 7: protos.Configs
}
var file_protos_configs_proto_depIdxs = []int32{
	0, // 0: protos.HttpServer.server:type_name -> protos.Server
	0, // 1: protos.GrpcServer.server:type_name -> protos.Server
	1, // 2: protos.Servers.http:type_name -> protos.HttpServer
	2, // 3: protos.Servers.grpc:type_name -> protos.GrpcServer
	3, // 4: protos.Configs.servers:type_name -> protos.Servers
	4, // 5: protos.Configs.database:type_name -> protos.Database
	5, // 6: protos.Configs.messageQueue:type_name -> protos.MessageQueue
	6, // 7: protos.Configs.logging:type_name -> protos.Logging
	8, // [8:8] is the sub-list for method output_type
	8, // [8:8] is the sub-list for method input_type
	8, // [8:8] is the sub-list for extension type_name
	8, // [8:8] is the sub-list for extension extendee
	0, // [0:8] is the sub-list for field type_name
}

func init() { file_protos_configs_proto_init() }
func file_protos_configs_proto_init() {
	if File_protos_configs_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_protos_configs_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Server); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*HttpServer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GrpcServer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Servers); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Database); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MessageQueue); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Logging); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protos_configs_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Configs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_protos_configs_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_protos_configs_proto_goTypes,
		DependencyIndexes: file_protos_configs_proto_depIdxs,
		MessageInfos:      file_protos_configs_proto_msgTypes,
	}.Build()
	File_protos_configs_proto = out.File
	file_protos_configs_proto_rawDesc = nil
	file_protos_configs_proto_goTypes = nil
	file_protos_configs_proto_depIdxs = nil
}
