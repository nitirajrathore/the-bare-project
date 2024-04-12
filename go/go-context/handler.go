package main

import (
	"log"
	"net/http"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// Extract the context from the request
	ctx := r.Context()

	// Simulate a long-running task
	select {
	case <-time.After(10 * time.Second):
		// If the task completes within the deadline, respond with a success message
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Task completed successfully\n"))
	case <-ctx.Done():
		// If the context is canceled before the task completes, respond with an error message
		err := ctx.Err()
		log.Printf("Handler error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Task canceled or timed out\n"))
	}
}
