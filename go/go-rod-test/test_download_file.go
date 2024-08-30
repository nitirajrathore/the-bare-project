package main

import (
	"log"
	"os"

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

// THis too works. Awesome.
func main() {
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
	log.Print("wrote ndownload.pdf")
}
