package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func main() {
	// create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// capture pdf
	var buf []byte
	if err := chromedp.Run(ctx,
		printToPDF1(`https://www.bseindia.com/bseplus/AnnualReport/543258/74183543258.pdf`, &buf)); err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("sample.pdf", buf, 0o644); err != nil {
		log.Fatal(err)
	}
	fmt.Println("wrote sample.pdf")
}

// print a specific pdf page.
func printToPDF1(urlstr string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
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
