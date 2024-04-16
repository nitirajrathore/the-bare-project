// Wire will generate the wire_gen.go file
//go:build wireinject
// +build wireinject

package main

import "github.com/google/wire"

func Initialize() (MyObjects, error) {
	wire.Build(NewEvent, NewGreeter, NewMessage, NewMyObjects)
	return MyObjects{}, nil
}
