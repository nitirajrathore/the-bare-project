package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/proto"
)

// WORKS FINE
func main_download_zip_works() {
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	url := "https://nsearchives.nseindia.com/corporate/d_Matrimony.zip"
	browser := rod.New().MustConnect()
	browserPage := browser.MustPage()

	wait := browserPage.Browser().Context(context.Background()).WaitDownload(wd)

	go browser.EachEvent(func(e *proto.PageDownloadProgress) bool {
		completed := "(unknown)"
		if e.TotalBytes != 0 {
			completed = fmt.Sprintf("%0.2f%%", e.ReceivedBytes/e.TotalBytes*100.0)
		}
		log.Printf("state: %s, completed: %s\n", e.State, completed)
		return e.State == proto.PageDownloadProgressStateCompleted
	})()
	// Navigate to the page with the ZIP file link

	err = browserPage.Navigate(url)
	if err != nil && !strings.Contains(err.Error(), "net::ERR_ABORTED") {
		// Note: Ignoring the net::ERR_ABORTED page error is essential here
		// since downloads will cause this error to be emitted, although the
		// download will still succeed.
		log.Printf("Error occurred while creating page for url : %s using rod: %v", url, err)
		return
	}
	defer browserPage.Close()

	res := wait()
	log.Printf("wrote %s", filepath.Join(wd, res.GUID))
}

func main_not_working() {
	// get working directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	url := "https://nsearchives.nseindia.com/corporate/d_Matrimony.zip"
	browser := rod.New().MustConnect()

	browserPage, err := browser.Page(proto.TargetCreateTarget{
		URL: url,
	})

	if err != nil && !strings.Contains(err.Error(), "net::ERR_ABORTED") {
		// Note: Ignoring the net::ERR_ABORTED page error is essential here
		// since downloads will cause this error to be emitted, although the
		// download will still succeed.
		log.Printf("Error occurred while creating page for url : %s using rod: %v", url, err)
		return
	}
	defer browserPage.Close()

	//page.MustElementR("summary", "Code").MustClick()

	wait := browserPage.Browser().Context(context.Background()).WaitDownload(wd)

	//browserPage.Browser().Context(context.Background()).wa
	go browser.EachEvent(func(e *proto.PageDownloadProgress) bool {
		completed := "(unknown)"
		if e.TotalBytes != 0 {
			completed = fmt.Sprintf("%0.2f%%", e.ReceivedBytes/e.TotalBytes*100.0)
		}
		log.Printf("state: %s, completed: %s\n", e.State, completed)
		return e.State == proto.PageDownloadProgressStateCompleted
	})()

	//page.MustElementR("a", "Download ZIP").MustClick()
	//err = browserPage.WaitLoad()
	//if err != nil {
	//	log.Printf("error occurred while loading page %s: %v", url, err)
	//	return
	//}
	res := wait()

	log.Printf("wrote %s", filepath.Join(wd, res.GUID))
}
