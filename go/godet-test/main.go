package main

import (
	"fmt"
	"github.com/raff/godet"
	"io/ioutil"
	"log"
)

func main() {
	// Start Chrome with remote debugging enabled
	// chrome --headless --remote-debugging-port=9222

	// Connect to Chrome instance
	debugger, err := godet.Connect("localhost:9222", true)
	if err != nil {
		log.Fatalf("Cannot connect to Chrome instance: %v", err)
	}
	defer debugger.Close()

	fmt.Println("Connected to Chrome")

	// Set up a handler to intercept network responses
	debugger.CallbackEvent("Network.responseReceived", func(params godet.Params) {
		response := params.Obj("response")
		url := response.String("url")
		mimeType := response.String("mimeType")

		// Check if the URL is the one we're interested in and it's a PDF
		if url == "https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf" && mimeType == "application/pdf" {
			fmt.Println("PDF detected, downloading...")

			// Get the request ID to fetch the response body
			requestID := params.String("requestId")
			body, err := debugger.GetResponseBody(requestID)
			if err != nil {
				log.Fatalf("Failed to get response body: %v", err)
			}

			// Write the PDF to a file
			err = ioutil.WriteFile("output.pdf", []byte(body), 0644)
			if err != nil {
				log.Fatalf("Failed to write PDF to file: %v", err)
			}

			fmt.Println("PDF downloaded successfully as output.pdf")
		}
	})

	// Enable necessary domains
	_, err = debugger.NetworkEvents(true)
	if err != nil {
		log.Fatalf("Failed to enable network events: %v", err)
	}

	// Navigate to the PDF URL
	_, err = debugger.Navigate("https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf")
	if err != nil {
		log.Fatalf("Failed to navigate to URL: %v", err)
	}

	// Wait for the PDF to be downloaded
	select {}
}
