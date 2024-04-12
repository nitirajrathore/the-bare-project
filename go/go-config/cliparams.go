package main

import (
	"flag"
	"fmt"
)

func main1() {
	var name string
	var age int
	var male bool

	flag.StringVar(&name, "name", "John Doe", "The name of the user")
	flag.IntVar(&age, "age", 25, "The age of the user")
	flag.BoolVar(&male, "male", false, "Is the user male? (true/false)")

	flag.Parse()

	fmt.Printf("Name: %s\n", name)
	fmt.Printf("Age: %d\n", age)
	fmt.Printf("Male: %t", male)

	//config := config.NewConfig()

}

func main2() {
	// Define boolean flags with default value false
	var debugMode bool
	flag.BoolVar(&debugMode, "debug", false, "Enable debug mode")

	// Define boolean flag for male with default value true
	var male bool
	flag.BoolVar(&male, "male", true, "Are you male? (true/false)")

	// Define string and int flags
	var name string
	var age int
	flag.StringVar(&name, "name", "", "Your name")
	flag.IntVar(&age, "age", 0, "Your age")

	// Parse the command-line flags
	flag.Parse()

	// Print the values of the flags
	fmt.Println("Debug Mode:", debugMode)
	fmt.Println("Name:", name)
	fmt.Println("Age:", age)
	fmt.Println("Male:", male)
}
