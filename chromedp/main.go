package main

import (
	"context"
	"log"
	"os"
	"strconv"
	"time"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	file, err := os.OpenFile("logs/chromedp-test-"+strconv.FormatInt(time.Now().UnixNano(), 10)+".log",
		os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	defer file.Close()

	// Set the log output to the file
	log.SetOutput(file)

	path := os.Getenv("PATH")
	log.Println("PATH : " + path)
	log.Println("os.Environ() : %v", os.Environ())

	test_scrapper()
}

func test_scrapper() {

	symbol := os.Getenv("SYMBOL")
	PageUrl := "https://www.screener.in/company/" + symbol + "/"
	CssSelector := ".annual-reports li"
	ctx := context.Background()

	links := ScrapeLinksFromPageWithContext(ctx, PageUrl, CssSelector)
	log.Println("Links found: ", links)
}
