# source : [Deep Crawling - Crawl4AI Documentation (v0.5.x)](https://docs.crawl4ai.com/core/deep-crawling/)
# not a great choice of website for this example, as it does not have any depth starting from the first page. 

import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.deep_crawling import BFSDeepCrawlStrategy
from crawl4ai.content_scraping_strategy import LXMLWebScrapingStrategy

async def main():
  browser_config = BrowserConfig(headless=False)
  #configure a 2-level deep crawl
  config = CrawlerRunConfig(
    deep_crawl_strategy=BFSDeepCrawlStrategy(
      max_depth=1,
      include_external=False,
      ),
      scraping_strategy=LXMLWebScrapingStrategy(),
      verbose=True,
      stream=True
  )

  async with AsyncWebCrawler(config=browser_config) as crawler:
    async for result in await crawler.arun("https://en.wikipedia.org/wiki/Dharmendra_Pradhan", config=config):
      if result.success:
          print(f"Just completed: {result.url}")

if __name__ == "__main__":
  asyncio.run(main())