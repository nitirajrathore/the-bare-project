from urllib.parse import urlparse
import os
import requests
from urllib.parse import urljoin, urlparse
from pdf2image import convert_from_path
from markdownify import markdownify as md
from pdfminer.high_level import extract_text
import pytesseract

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
        
        # Extract text from the PDF using pdfminer
        text_pdfminer = extract_text(file_path)
        md_content_pdfminer = md(text_pdfminer)
        md_file_path_pdfminer = os.path.join('markdown', path.replace('.pdf', '.pdf.md'))
        os.makedirs(os.path.dirname(md_file_path_pdfminer), exist_ok=True)
        with open(md_file_path_pdfminer, 'w', encoding='utf-8') as f:
            f.write(md_content_pdfminer)
        
        # Extract text from the PDF using OCR
        images = convert_from_path(file_path)
        text_ocr = ""
        for image in images:
            text_ocr += pytesseract.image_to_string(image)
        md_content_ocr = md(text_ocr)
        md_file_path_ocr = os.path.join('markdown', path.replace('.pdf', '.ocr.md'))
        os.makedirs(os.path.dirname(md_file_path_ocr), exist_ok=True)
        with open(md_file_path_ocr, 'w', encoding='utf-8') as f:
            f.write(md_content_ocr)