#  source: [Quick Start - Crawl4AI Documentation (v0.5.x)](https://docs.crawl4ai.com/core/quickstart/)

import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

async def main():
  browser_conf = BrowserConfig(headless=True, verbose=True)
  run_conf = CrawlerRunConfig(
    cache_mode=CacheMode.BYPASS,
  )

  async with AsyncWebCrawler(config=browser_conf) as crawler: 
    result = await crawler.arun("https://example.com", config=run_conf)
    print("----------------- MARKDOWN -----------------")
    print(result.markdown[:300])

    # print("----------------- FIT MARKDOWN -----------------")
    # print(result.fit_markdown[:300])

    # print("----------------- FIT HTML -----------------")
    # print(result.fit_html[:300])

    print("----------------- MARKDOWN V2 -----------------")
    print(result.markdown_v2.fit_markdown[:300])

    print("----------------- MARKDOWN V2 HTML -----------------")
    print(result.markdown_v2.fit_html[:300])

    print("----------------- MARKDOWN V2 RAW -----------------")
    print(result.markdown_v2.raw_markdown[:300])

    print("----------------- MARKDOWN V2 REFERENCES -----------------")
    print(result.markdown_v2.references_markdown[:300])

    print("----------------- HTML -----------------")
    print(result.html[:300])

    print("----------------- CLEANED HTML -----------------")
    print(result.cleaned_html[:300])



if __name__ == "__main__":
  asyncio.run(main())
