package main

import (
	"context"
	"fmt"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"log"
	"os"
	"strconv"
	"time"
)

const TASK_QUEUE_NAME = "scrapper-task-queue"

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

	//test_scrapper()
	app := os.Getenv("APP_TYPE")
	if app == "temporal-worker" {
		start_worker()
	} else if app == "temporal-trigger" {
		start_trigger()
	} else {
		test_scrapper()
	}
}

func start_trigger() {
	fmt.Println("starting start_trigger")
	log.Println("starting start_trigger")
	c, err := client.Dial(client.Options{HostPort: "temporal-server:7233"})
	if err != nil {
		log.Fatalln("Unable to create Temporal client.", err)
	}
	defer c.Close()

	symbol := os.Getenv("SYMBOL")

	// Start a workflow execution
	options := client.StartWorkflowOptions{
		ID:        symbol + "_" + strconv.Itoa(int(time.Now().Unix())),
		TaskQueue: TASK_QUEUE_NAME,
	}

	we, err := c.ExecuteWorkflow(context.Background(), options, ScrappingTest, symbol)
	if err != nil {
		log.Fatalln("Unable to start the Workflow:", err)
	}

	log.Printf("WorkflowID: %s RunID: %s\n", we.GetID(), we.GetRunID())

	var scrapperOutput ScrapperOutput

	err = we.Get(context.Background(), &scrapperOutput)

	if err != nil {
		log.Fatalln("Unable to get Workflow result:", err)
	}

	log.Printf("output of scrapping : %v", scrapperOutput)
}

func start_worker() {
	fmt.Println("starting start_worker")
	log.Println("starting start_worker")

	c, err := client.Dial(client.Options{HostPort: "temporal-server:7233"})
	if err != nil {
		log.Fatalln("Unable to create Temporal client.", err)
	}
	defer c.Close()

	w := worker.New(c, TASK_QUEUE_NAME, worker.Options{})

	// This worker hosts both Workflow and Activity functions.
	w.RegisterWorkflow(ScrappingTest)
	w.RegisterActivity(Temporal_ScrapeLinksFromPageWithContext)

	// Start listening to the Task Queue.
	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("unable to start Worker", err)
	}
}

func test_scrapper() {
	fmt.Println("starting test_scrapper")
	log.Println("starting test_scrapper")
	symbol := os.Getenv("SYMBOL")
	PageUrl := "https://www.screener.in/company/" + symbol
	CssSelector := ".annual-reports li"
	ctx := context.Background()

	links := ScrapeLinksFromPageWithContext(ctx, PageUrl, CssSelector)
	log.Printf("test_scrapper Links found: %v", links)
	fmt.Printf("test_scrapper Links found: %v", links)
}
