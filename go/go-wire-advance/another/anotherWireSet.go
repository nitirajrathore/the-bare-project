package another

import (
	"github.com/google/wire"
	"go-wire-advance/foobarbaz"
)

type A struct {
	X int
}

func ProvideA() A {
	return A{X: 42}
}

type B struct {
	X int
}

func ProvideB(a A) B {
	return B{X: -a.X}
}

var AnotherSuperSet = wire.NewSet(ProvideA, ProvideB)

var CompositeSuperSet = wire.NewSet(foobarbaz.SuperSet, AnotherSuperSet)
