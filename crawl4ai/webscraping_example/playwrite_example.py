import os
import re
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import argparse
from collections import deque

from utils import save_image, save_markdown_content, save_page_content, save_pdf_as_markdown

# def is_url_downloaded(url, folder):
#     parsed_url = urlparse(url)
#     domain_folder = os.path.join(folder, parsed_url.netloc)
#     path = parsed_url.path.strip('/')
#     if not path:
#         path = 'index.html'
#     else:
#         path = f"{path}.html"
#     file_path = os.path.join(domain_folder, 'website', path)
#     return os.path.exists(file_path)

def crawl(start_url, depth, browser, folder):
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
            save_page_content(url, content, folder)
            save_markdown_content(url, content, folder)
            links = page.query_selector_all('a')
            # images = page.query_selector_all('img')
            pdfs = page.query_selector_all('a[href$=".pdf"]')
            # for img in images:
            #     img_url = img.get_attribute('src')
            #     if img_url:
            #         img_url = urljoin(url, img_url)
            #         save_image(img_url, folder)
            for pdf in pdfs:
                pdf_url = pdf.get_attribute('href')
                if pdf_url:
                    pdf_url = urljoin(url, pdf_url)
                    save_pdf_as_markdown(pdf_url, folder)
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
        crawl(args.url, args.depth, browser, 'data')
        browser.close()

if __name__ == '__main__':
  try:
    main()
  except Exception as e:
    print(f"An error occurred: {e}")