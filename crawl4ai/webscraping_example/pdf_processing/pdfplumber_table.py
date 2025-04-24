import pdfplumber
from tabulate import tabulate
import argparse

def extract_tables(filename):
    with pdfplumber.open(filename) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            tables = page.extract_tables()
            print(f"tables object: {tables}")
            for table_num, table in enumerate(tables, 1):
                print(f"\n### Table {table_num} from Page {page_num}")
                print(tabulate(table, tablefmt="github"))

def main():
    parser = argparse.ArgumentParser(description='Extract tables from PDF file')
    parser.add_argument('filename', help='Path to the PDF file')
    args = parser.parse_args()
    
    try:
        extract_tables(args.filename)
    except FileNotFoundError:
        print(f"Error: File '{args.filename}' not found")
    except Exception as e:
        print(f"Error processing file: {e}")

if __name__ == "__main__":
    main()


##########################

# Does not work for data/fees_shishukunj.pdf : https://www.shishukunj.in/jhalaria-campus/wp-content/uploads/2024/09/SV_-Nursery_Information-about-fees-2025-26.pdf

# Does not extract from  : https://www.shishukunj.in/jhalaria-campus/wp-content/uploads/2024/12/Fee-Chart_-Sr-KG-X_JC_25-26.pdf

##########################
# works for  data/NC_-Jr-KG-to-X-fees-2025-26.shishukunj.pdf.pdf -- three tables extracted.
# python pdf_processing/pdfplumber_table.py data/NC_-Jr-KG-to-X-fees-2025-26.shishukunj.pdf.pdf