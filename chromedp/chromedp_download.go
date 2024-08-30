package main

import (
	"context"
	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
	"log"
	"os"
	"time"
)

func main() {
	url1 := "https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf"
	//url2 := "https://nsearchives.nseindia.com/content/equities/IPO_RHP_UNICOMM.pdf"
	//url3 := "https://www.bseindia.com/corporates/download/PRO_MCFL.pdf"
	Chromepd_download(url1)
}

func Chromepd_download(urlstr string) {
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
	var buf []byte
	if err := chromedp.Run(ctx, chromedp.ActionFunc(func(ctx context.Context) error {
		var err error
		buf, err = network.GetResponseBody(requestID).Do(ctx)
		return err
	})); err != nil {
		log.Fatal(err)
	}

	// write the file to disk - since we hold the bytes we dictate the name and
	// location
	if err := os.WriteFile("download.pdf", buf, 0644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote download.pdf")
}
