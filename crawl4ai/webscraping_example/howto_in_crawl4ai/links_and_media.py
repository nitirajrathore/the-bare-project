from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
import asyncio

async def main():
    async with AsyncWebCrawler() as crawler:
        # local_file_path = "/home/nitiraj/praroopai/test-website-generator/random-website-generator/generated_site/level_3/business-focused-mobile-moderator.html"  # Replace with your file path
        # file_url = f"file://{local_file_path}"
        # config = CrawlerRunConfig(bypass_cache=True)
        # result = await crawler.arun(url=file_url, config=config)

        # result = await crawler.arun("http://localhost:5000")
        # result = await crawler.arun("https://docs.crawl4ai.com/core/local-files/")
        result = await crawler.arun("https://data.humdata.org/dataset/repository-for-pdf-files")
        if result.success:
            # print("all links : ", result.links)
            internal_links = result.links.get("internal", [])
            external_links = result.links.get("external", [])
            print(f"Found {len(internal_links)} internal links.")
            print(f"Found {len(external_links)} external links.")
            print(f"Found {len(result.media)} media items.")
            # print(f"Media items:  {result.media}")

            # Each link is typically a dictionary with fields like:
            # { "href": "...", "text": "...", "title": "...", "base_domain": "..." }
            if internal_links:
                print("Sample Internal Link:", internal_links)
            if external_links:
                print("Sample External Link:", external_links)

            # print("result.html\n", result.markdown)
        else:
            print("Crawl failed:", result.error_message)

if __name__ == "__main__":
    asyncio.run(main())
