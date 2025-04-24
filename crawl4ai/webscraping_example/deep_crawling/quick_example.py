# source : [Deep Crawling - Crawl4AI Documentation (v0.5.x)](https://docs.crawl4ai.com/core/deep-crawling/)
# not a great choice of website for this example, as it does not have any depth starting from the first page. 

import asyncio
import os
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.deep_crawling import BFSDeepCrawlStrategy
from crawl4ai.content_scraping_strategy import LXMLWebScrapingStrategy

async def main():
  #configure a 2-level deep crawl
  downloads_path = os.path.join('.', 'data', "downloads")  # Custom download path
  os.makedirs(downloads_path, exist_ok=True)

  browser_config = BrowserConfig(
      # timeout=self.params.timeout,
      headless=True,
      accept_downloads=True,
      downloads_path=downloads_path
  )
        
  config = CrawlerRunConfig(
    deep_crawl_strategy=BFSDeepCrawlStrategy(
      max_depth=0,
      include_external=False,
      ),
      scraping_strategy=LXMLWebScrapingStrategy(),
      verbose=True,
  )

  async with AsyncWebCrawler(config=browser_config) as crawler:
    results = await crawler.arun("https://dpsindore.org/", config=config)
    print(f"Crawled {len(results)} pages")

    for result in results[:3]:
      print(f"URL: {result.url}")
      print(f"Depth: {result.metadata.get('depth', 0)}")
      print(f"Markdown: {result.markdown}")

if __name__ == "__main__":
  asyncio.run(main())