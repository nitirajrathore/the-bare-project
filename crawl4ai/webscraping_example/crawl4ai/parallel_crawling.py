import asyncio
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode, BrowserConfig

async def quick_parallel_example():
  urls = [
      "https://example.com",
      "https://example.org",
      "https://example.net",
  ]
  browser_config = BrowserConfig(headless=False)

  run_conf = CrawlerRunConfig(
    cache_mode=CacheMode.BYPASS,
    stream=True,  
  )


  async with AsyncWebCrawler(config=browser_config) as crawler:
    # Stream results as they complete
    async for result in await crawler.arun_many(urls, config=run_conf):
      if result.success:
        print(f"[OK] {result.url}, length: {len(result.markdown.raw_markdown)}")
      else:
        print(f"[ERROR] {result.url} => {result.error_message}")

    # Or get all results at once (default behavior)
    run_conf = run_conf.clone(stream=False)
    results = await crawler.arun_many(urls, config=run_conf)
    for result in results:
      if result.success:
        print(f"[OK] {result.url}, length: {len(result.markdown.raw_markdown)}")
      else:
        print(f"[ERROR] {result.url} => {result.error_message}")


if __name__ == "__main__":
  asyncio.run(quick_parallel_example())
