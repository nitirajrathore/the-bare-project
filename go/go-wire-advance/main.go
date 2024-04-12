package main

import (
	"context"
	"fmt"
)

func main() {
	var baz, err = initializeBaz(context.Background())
	if err != nil {
		fmt.Println(err)
		return
	}
	var b = initializeB()
	fmt.Println(baz, b)
}
