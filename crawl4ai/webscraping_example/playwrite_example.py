import os
import re
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import argparse
from collections import deque

from utils import save_image, save_markdown_content, save_page_content, save_pdf_as_markdown

# Create directories for storing the website and markdown content
os.makedirs('website', exist_ok=True)
os.makedirs('markdown', exist_ok=True)

def crawl(start_url, depth, browser):
    visited = set()
    queue = deque([(start_url, 0)])
    page = browser.new_page()
    
    while queue:
        url, current_depth = queue.popleft()
        if current_depth > depth or url in visited:
            continue
        visited.add(url)
        try:
            page.goto(url)
            content = page.content()
            save_page_content(url, content, 'website')
            save_markdown_content(url, content)
            links = page.query_selector_all('a')
            images = page.query_selector_all('img')
            pdfs = page.query_selector_all('a[href$=".pdf"]')
            for img in images:
                img_url = img.get_attribute('src')
                if img_url:
                    img_url = urljoin(url, img_url)
                    save_image(img_url, 'website')
            for pdf in pdfs:
                pdf_url = pdf.get_attribute('href')
                if pdf_url:
                    pdf_url = urljoin(url, pdf_url)
                    save_pdf_as_markdown(pdf_url, 'website')
            for link in links:
                href = link.get_attribute('href')
                if href and urlparse(href).netloc == urlparse(url).netloc:
                    queue.append((urljoin(url, href), current_depth + 1))
        except PlaywrightTimeoutError:
            print(f"Timeout while trying to access {url}")
            page.close()
            page = browser.new_page()
        except Exception as e:
            print(f"Error while trying to access {url}: {e}")
            page.close()
            page = browser.new_page()
    
    page.close()

def main():
    parser = argparse.ArgumentParser(description='Crawl a website and download its content.')
    parser.add_argument('url', type=str, help='The starting URL of the website to crawl')
    parser.add_argument('depth', type=int, help='The depth to which the website should be crawled')
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        crawl(args.url, args.depth, browser)
        browser.close()

if __name__ == '__main__':
    main()