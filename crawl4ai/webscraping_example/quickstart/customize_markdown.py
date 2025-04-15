# Fails with error:
#   File "/home/nitiraj/praroopai/mywork/the-bare-project/crawl4ai/webscraping_example/crawl4ai/customize_markdown.py", line 18, in main
#     print("Raw Markdown length:", len(result.markdown.raw_markdown))
#                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# AttributeError: 'str' object has no attribute 'raw_markdown'

import asyncio

from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

async def main():

  md_generator = DefaultMarkdownGenerator(
      content_filter=PruningContentFilter(threshold=0.48, threshold_type="fixed")
  )
  config = CrawlerRunConfig(
      cache_mode=CacheMode.BYPASS,
      markdown_generator=md_generator
  )
  async with AsyncWebCrawler() as crawler:
    result = await crawler.arun("https://news.ycombinator.com", config=config)
    print("Raw Markdown length:", len(result.markdown.raw_markdown))
    print("Fit Markdown length:", len(result.markdown.fit_markdown))


if __name__ == "__main__":
    asyncio.run(main())
