package main

import (
	"context"
	"fmt"
	"github.com/go-rod/rod/lib/proto"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-rod/rod"
)

// works
func main1() {
	u := "https://avatars.githubusercontent.com/u/33149672"

	browser := rod.New().MustConnect()

	page := browser.MustPage(u).MustWaitLoad()

	b, err := page.GetResource(u)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("download.png", b, 0o644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote download.png")
}

// works
func main2() {
	u := "https://www.bseindia.com/corporates/download/DRHP_IIL.pdf"

	browser := rod.New().MustConnect()

	page := browser.MustPage(u).MustWaitLoad()

	b, err := page.GetResource(u)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("download.pdf", b, 0o644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote ndownload.pdf")
}

// THis too works. Awesome.
func main3() {
	u := "https://nsearchives.nseindia.com/content/equities/IPO_RHP_UNICOMM.pdf"

	browser := rod.New().MustConnect()

	page := browser.MustPage(u).MustWaitLoad()

	b, err := page.GetResource(u)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("download.pdf", b, 0o644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote ndownload.pdf")
}

// NOT WORKING.
func main_bseindia_not_working() {
	u := "https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf"

	browser := rod.New().MustConnect()

	page := browser.MustPage(u).MustWaitLoad()

	b, err := page.GetResource(u)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("download.pdf", b, 0o644); err != nil {
		log.Fatal(err)
	}
	log.Print("wrote download.pdf")
}

func main_download_pdf_with_progress() {
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	url := "https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf"
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

	err = browserPage.WaitLoad()
	if err != nil {
		log.Printf("Error occurred while waiting for page to load : %s using rod: %v", url, err)
		return
	}
	res := wait()
	log.Printf("wrote %s", filepath.Join(wd, res.GUID))
}

func main() {
	main_download_pdf_with_progress()
}
