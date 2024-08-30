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
	address *Address
}

func (p Person) setAgeByValue(age int) {
	p.age = age
}

func (p *Person) setAgeByPointer(age int) {
	p.age = age
}

func printPerson(p Person) {
	fmt.Println("p = ", p)
	fmt.Printf("&p = %p\n", &p)
}

func printPersonWithPointer(p *Person) {
	fmt.Println("p = ", *p)
	fmt.Printf("&p = %p\n", p)
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
		address: &addr,
	}

	fmt.Println("p = ", p)
	fmt.Printf("&p = %p\n", &p)

	fmt.Println("addr = ", addr)
	fmt.Printf("&addr = %p\n", &addr)

	fmt.Println("*p.address = ", *p.address)
	fmt.Printf("&p.address = %p\n", &p.address)
	fmt.Println("p.address = %p\n", p.address)

	// fmt.Println("p.age = ", p.age)
	// p.setAgeByValue(40)
	// fmt.Println("p.age = ", p.age)
	// p.setAgeByPointer(50)
	// fmt.Println("p.age = ", p.age)

	printPerson(p)
}
