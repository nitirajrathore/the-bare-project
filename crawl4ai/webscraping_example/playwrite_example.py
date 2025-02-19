import os
import re
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright
import argparse

from utils import save_image, save_markdown_content, save_page_content, save_pdf_as_markdown

# Create directories for storing the website and markdown content
os.makedirs('website', exist_ok=True)
os.makedirs('markdown', exist_ok=True)

def crawl(url, depth, visited, page):
    if depth == 0 or url in visited:
        return
    visited.add(url)
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
            crawl(urljoin(url, href), depth - 1, visited, page)

def main():
    parser = argparse.ArgumentParser(description='Crawl a website and download its content.')
    parser.add_argument('url', type=str, help='The starting URL of the website to crawl')
    parser.add_argument('depth', type=int, help='The depth to which the website should be crawled')
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        crawl(args.url, args.depth, set(), page)
        browser.close()

if __name__ == '__main__':
    main()