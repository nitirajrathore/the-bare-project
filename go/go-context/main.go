package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func main() {
	// Create a new server and register the handler
	server := &http.Server{
		Addr: ":8080",
	}
	http.HandleFunc("/task", handler)

	// Start the server in a goroutine
	go func() {
		log.Println("Starting server on port 8080...")
		if err := server.ListenAndServe(); err != nil {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for a signal to gracefully shutdown the server
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)
	<-sig

	// Gracefully shutdown the server with a 5-second timeout
	log.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Shutdown error: %v", err)
	}
	log.Println("Server gracefully stopped")
}
