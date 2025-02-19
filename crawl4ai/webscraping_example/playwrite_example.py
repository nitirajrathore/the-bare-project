import os
import re
import requests
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright
from pdf2image import convert_from_path
from markdownify import markdownify as md
import asyncio

# Create directories for storing the website and markdown content
os.makedirs('website', exist_ok=True)
os.makedirs('markdown', exist_ok=True)

def save_page_content(url, content, folder):
    parsed_url = urlparse(url)
    path = parsed_url.path.strip('/')
    if not path:
        path = 'index.html'
    else:
        path = f"{path}.html"
    file_path = os.path.join(folder, path)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def save_markdown_content(url, content):
    parsed_url = urlparse(url)
    path = parsed_url.path.strip('/')
    if not path:
        path = 'index.md'
    else:
        path = f"{path}.md"
    file_path = os.path.join('markdown', path)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(md(content))

def save_image(url, folder):
    response = requests.get(url)
    if response.status_code == 200:
        parsed_url = urlparse(url)
        path = parsed_url.path.strip('/')
        file_path = os.path.join(folder, path)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'wb') as f:
            f.write(response.content)

def save_pdf_as_markdown(url, folder):
    response = requests.get(url)
    if response.status_code == 200:
        parsed_url = urlparse(url)
        path = parsed_url.path.strip('/')
        file_path = os.path.join(folder, path)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'wb') as f:
            f.write(response.content)
        images = convert_from_path(file_path)
        md_content = ""
        for image in images:
            md_content += f"![PDF Image]({file_path})\n"
        md_file_path = file_path.replace('.pdf', '.md')
        with open(md_file_path, 'w', encoding='utf-8') as f:
            f.write(md_content)

async def crawl(url, depth, visited):
    if depth == 0 or url in visited:
        return
    visited.add(url)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto(url)
        content = await page.content()
        save_page_content(url, content, 'website')
        save_markdown_content(url, content)
        links = await page.query_selector_all('a')
        images = await page.query_selector_all('img')
        pdfs = await page.query_selector_all('a[href$=".pdf"]')
        for img in images:
            img_url = await img.get_attribute('src')
            if img_url:
                img_url = urljoin(url, img_url)
                save_image(img_url, 'website')
        for pdf in pdfs:
            pdf_url = await pdf.get_attribute('href')
            if pdf_url:
                pdf_url = urljoin(url, pdf_url)
                save_pdf_as_markdown(pdf_url, 'website')
        for link in links:
            href = await link.get_attribute('href')
            if href and urlparse(href).netloc == urlparse(url).netloc:
                await crawl(urljoin(url, href), depth - 1, visited)
        await browser.close()

start_url = 'https://emeraldheights.edu.in/'
asyncio.run(crawl(start_url, 20, set()))