package main

import (
	"log"
	"time"

	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
)

type ScrapperOutput struct {
	FileLinks []FileLink
}

func ScrappingTest(ctx workflow.Context, symbol string) (ScrapperOutput, error) {

	// RetryPolicy specifies how to automatically handle retries if an Activity fails.
	retrypolicy := &temporal.RetryPolicy{
		InitialInterval:    time.Second,
		BackoffCoefficient: 1.0,
		MaximumInterval:    1 * time.Second,
		MaximumAttempts:    1, // 0 is unlimited retries
		//NonRetryableErrorTypes: []string{"InvalidAccountError", "InsufficientFundsError"},
	}

	options := workflow.ActivityOptions{
		// Timeout options specify when to automatically timeout Activity functions.
		StartToCloseTimeout: 2 * time.Minute,
		// Optionally provide a customized RetryPolicy.
		// Temporal retries failed Activities by default.
		RetryPolicy: retrypolicy,
	}

	// Apply the options.
	ctx = workflow.WithActivityOptions(ctx, options)
	//ctx, cancelHandler := workflow.WithCancel(ctx)
	//defer cancelHandler()

	var scrapperOutput ScrapperOutput
	scrapperErr := workflow.ExecuteActivity(ctx, Temporal_ScrapeLinksFromPageWithContext,
		symbol).Get(ctx, &scrapperOutput)
	// TODO: de-dup and save these extracted links in a database.

	if scrapperErr != nil {
		log.Printf("Error scraping links from page: %v", scrapperErr)
		return scrapperOutput, scrapperErr
	}

	return scrapperOutput, nil
}
