package utils

import (
	"go-mongo/internal/entity"
	services "go-mongo/protos/services"
	"time"
)

func ProtoToEcho(ep *services.EchoMessage) *entity.Echo {
	return &entity.Echo{
		Message: ep.GetValue(),
		Time:    time.Now(),
	}
}

func EchoToProto(e *entity.Echo) *services.EchoMessage {
	return &services.EchoMessage{
		Value: e.Message,
	}
}
