package main

import (
	"context"
	"log"
	"net/http"
	"sync"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func main() {
	http.Handle("/pdf", http.HandlerFunc(servePDF))

	log.Fatal(http.ListenAndServe(":8080", http.DefaultServeMux))
}

func servePDF(w http.ResponseWriter, r *http.Request) {
	buf, err := createPDF()

	if err != nil {
		log.Fatalln(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Write(buf)
}

func createPDF() ([]byte, error) {
	ctx, cancel := newTabContext()
	defer cancel()

	html := `<html>
<body>
<div>text</div>
<img src="https://pkg.go.dev/static/shared/gopher/package-search-700x300.jpeg"/>
<img src="https://go.dev/images/gophers/motorcycle.svg"/>
<img src="https://go.dev/images/go_google_case_study_carousel.png" />
</body>
</html>`

	var buf []byte
	if err := chromedp.Run(ctx,
		chromedp.Navigate("about:blank"),
		// set the page content and wait until the page is loaded (including its resources).
		chromedp.ActionFunc(func(ctx context.Context) error {
			lctx, cancel := context.WithCancel(ctx)
			defer cancel()
			var wg sync.WaitGroup
			wg.Add(1)
			chromedp.ListenTarget(lctx, func(ev interface{}) {
				if _, ok := ev.(*page.EventLoadEventFired); ok {
					// It's a good habit to remove the event listener if we don't need it anymore.
					cancel()
					wg.Done()
				}
			})

			frameTree, err := page.GetFrameTree().Do(ctx)
			if err != nil {
				return err
			}

			if err := page.SetDocumentContent(frameTree.Frame.ID, html).Do(ctx); err != nil {
				return err
			}
			wg.Wait()
			return nil
		}),
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			buf, _, err = page.PrintToPDF().WithPrintBackground(false).Do(ctx)
			if err != nil {
				return err
			}
			return nil
		}),
	); err != nil {
		return nil, err
	}

	return buf, nil
}

var (
	browserCtx context.Context
	once       sync.Once
)

// newTabContext creates a tab context with the global browser context as its parent context.
//
// When tasks is run with the returned context, a new tab will be created in the browser.
func newTabContext() (context.Context, context.CancelFunc) {
	once.Do(func() { initBrowser() })

	if browserCtx == nil || browserCtx.Err() != nil {
		log.Fatalf("browser is not available: %v", browserCtx.Err())
	}

	return chromedp.NewContext(browserCtx)
}

// initBrowser starts a browser in which to create new tab for running tasks.
func initBrowser() {
	browserCtx, _ = chromedp.NewContext(context.Background())

	// to start the browser
	if err := chromedp.Run(browserCtx); err != nil {
		log.Fatal(err)
	}
}
