package services

import (
	"context"
	"go-mongo/internal/entity"
	"go-mongo/internal/repository"

	"log"
)

type EchoService struct {
	echoRepository *repository.EchoRepository
}

func (es *EchoService) OnEchoReceived(ctx *context.Context, echo *entity.Echo) (*entity.Echo, error) {
	log.Printf("EchoService Received: %v", echo.Message)

	echoResponse, err := es.echoRepository.AddEcho(ctx, echo)

	return echoResponse, err
}

func NewEchoService(er *repository.EchoRepository) *EchoService {
	return &EchoService{
		echoRepository: er,
	}
}
