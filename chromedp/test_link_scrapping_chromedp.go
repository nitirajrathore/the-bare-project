package main

import (
	"context"
	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
	"log"
)

type FileLink struct {
	Url, Name string
}

func ScrapeLinksFromPageWithContext(inputCtx context.Context, pageUrl string,
	cssSelector string) []FileLink {
	// initializing a chrome instance
	ctx, cancel := chromedp.NewContext(
		inputCtx,
		chromedp.WithDebugf(log.Printf),
		chromedp.WithLogf(log.Printf),
		chromedp.WithErrorf(log.Printf),
	)
	defer cancel()
	var fileLinks = make([]FileLink, 0)

	// navigate to the target web page and select the HTML elements of interest
	var nodes []*cdp.Node
	chromedp.Run(ctx,
		chromedp.Navigate(pageUrl),
		chromedp.Nodes(cssSelector,
			&nodes, chromedp.ByQueryAll, chromedp.AtLeast(0)),
	)

	// scraping data from each node
	var url, name string
	for _, node := range nodes {
		//fmt.Println("node.NodeName : " + node.NodeName + "\tnode.Value" + node.Value)
		chromedp.Run(ctx,
			chromedp.AttributeValue("a", "href", &url, nil, chromedp.ByQuery, chromedp.FromNode(node)),
			chromedp.Text("a", &name, chromedp.ByQuery, chromedp.FromNode(node)),
		)

		fileLink := FileLink{}

		fileLink.Url = url
		fileLink.Name = name

		fileLinks = append(fileLinks, fileLink)
	}
	return fileLinks
}
