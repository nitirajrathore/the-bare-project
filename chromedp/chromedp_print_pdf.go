package main

import (
	"context"
	"fmt"
	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
	"log"
	"os"
	"path/filepath"
	"time"
)

func main() {
	url1 := "https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf"
	//url2 := "https://nsearchives.nseindia.com/content/equities/IPO_RHP_UNICOMM.pdf"
	//printPdfToPDF(url1)
	SaveToPdf2(url1)
}

func saveToPdf(pageUrl string, downloadDir string, fileNameUUID string) (string, error) {
	ctx, cancel := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
		chromedp.WithDebugf(log.Printf),
	)
	defer cancel()

	// create a timeout as a safety net to prevent any infinite wait loops
	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
	defer cancel()

	var buf []byte
	if err := chromedp.Run(ctx, printToPDF(pageUrl, &buf)); err != nil {
		log.Printf("Error occurred while printing pdf page to pdf %v", err)
		return "", err
	}

	filePath := filepath.Join(downloadDir, fileNameUUID)
	if err := os.WriteFile(filePath, buf, 0o644); err != nil {
		log.Printf("Error occurred while writing the file content to file, %s, $v", filePath, err)
		return "", err
	}
	fmt.Println("wrote " + filePath)
	return filePath, nil
}

func printPdfToPDF(url string) {
	pdf, err := saveToPdf(url, ".", "output.pdf")
	if err != nil {
		log.Println("Error downloading file", err)
	}
	log.Println("download output:", pdf)
}

// print a specific pdf page.
func printToPDF(urlstr string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.WaitReady(`body`),
		chromedp.ActionFunc(func(ctx context.Context) error {
			buf, _, err := page.PrintToPDF().WithPrintBackground(false).Do(ctx)
			if err != nil {
				return err
			}
			*res = buf
			return nil
		}),
	}
}

func SaveToPdf2(urlstr string) {
	ctx, cancel := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
		chromedp.WithDebugf(log.Printf),
	)
	defer cancel()

	// create a timeout as a safety net to prevent any infinite wait loops
	ctx, cancel = context.WithTimeout(ctx, 60*time.Second)
	defer cancel()

	// set up a channel, so we can block later while we monitor the download
	// progress
	done := make(chan bool)

	var requestID network.RequestID

	chromedp.ListenTarget(ctx, func(v interface{}) {
		switch ev := v.(type) {
		case *network.EventRequestWillBeSent:
			log.Printf("EventRequestWillBeSent: %v: %v", ev.RequestID, ev.Request.URL)
			if ev.Request.URL == urlstr {
				requestID = ev.RequestID
			}
		case *network.EventLoadingFinished:
			log.Printf("EventLoadingFinished: %v", ev.RequestID)
			if ev.RequestID == requestID {
				close(done)
			}
		}
	})

	// all we need to do here is navigate to the download url
	if err := chromedp.Run(ctx,
		chromedp.Navigate(urlstr),
	); err != nil {
		log.Fatal(err)
	}

	// This will block until the chromedp listener closes the channel
	<-done
	// get the downloaded bytes for the request id
	var res []byte
	if err := chromedp.Run(ctx,
		chromedp.ActionFunc(func(ctx context.Context) error {
			buf, _, err := page.PrintToPDF().WithPrintBackground(false).Do(ctx)
			if err != nil {
				return err
			}
			res = buf
			return nil
		}),
	); err != nil {
		log.Fatal(err)
	}

	// write the file to disk - since we hold the bytes we dictate the name and
	// location
	if err := os.WriteFile("download_print.pdf", res, 0644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote download_print.pdf")
}
