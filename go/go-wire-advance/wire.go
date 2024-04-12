//go:build wireinject
// +build wireinject

package main

import (
	"context"
	"go-wire-advance/another"
	foobarbaz "go-wire-advance/foobarbaz"

	"github.com/google/wire"
)

func initializeBaz(ctx context.Context) (foobarbaz.Baz, error) {
	wire.Build(foobarbaz.SuperSet)
	return foobarbaz.Baz{}, nil
}

func initializeB() another.B {
	wire.Build(another.AnotherSuperSet)
	return another.B{}
}
