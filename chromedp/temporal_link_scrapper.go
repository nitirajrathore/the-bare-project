package main

import (
	"context"
	"log"
)

func Temporal_ScrapeLinksFromPageWithContext(ctx context.Context,
	symbol string) (ScrapperOutput, error) {
	// Create a map to hold the JSON data
	PageUrl := "https://www.screener.in/company/" + symbol + "/"
	CssSelector := ".annual-reports li"

	links := ScrapeLinksFromPageWithContext(ctx, PageUrl, CssSelector)
	log.Printf("found links from with in temporal activity : %v", links)
	return ScrapperOutput{FileLinks: links}, nil
}
