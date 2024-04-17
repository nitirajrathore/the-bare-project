package main

import (
	"fmt"
)

type Address struct {
	houseNo int
	street  string
}

type Person struct {
	name    string
	age     int
	address Address
}

func main() {
	addr := Address{
		houseNo: 123,
		street:  "Main St",
	}
	// Create a new person
	p := Person{
		name:    "John Doe",
		age:     30,
		address: addr,
	}

	fmt.Println("p = ", p)
	fmt.Printf("&p = %p\n", &p)

	fmt.Println("addr = ", addr)
	fmt.Printf("&addr = %p\n", &addr)

	fmt.Println("p.address = ", p.address)
	fmt.Printf("&p.address = %p\n", &p.address)

}
