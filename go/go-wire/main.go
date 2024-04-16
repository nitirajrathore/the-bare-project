package main

import "fmt"

type Message string

type Greeter struct {
	Message Message
}

type Event struct {
	Greeter Greeter
}

func NewMessage() Message {
	return Message("Hi there!")
}

func NewGreeter(m Message) Greeter {
	return Greeter{Message: m}
}

func NewEvent(g Greeter) Event {
	return Event{Greeter: g}
}

func (e Event) Start() {
	msg := e.Greeter.Message
	fmt.Println(msg)
}

type MyObjects struct {
	Event   Event
	Message Message
}

func NewMyObjects(event Event, message Message) MyObjects {
	return MyObjects{Event: event, Message: message}
}

func main() {
	myobs, _ := Initialize()
	myobs.Event.Start()

	fmt.Println(myobs.Message)
}
