
# Other dependencies:
#     • `pdfimages' 20.09.0 of [Poppler]
#   • `tesseract' 5.0.0 of [Tesseract]
#   • `mogrify' 7.0.10 of [ImageMagick]

# Interesting documentation : https://eihli.github.io/image-table-ocr/pdf_table_extraction_and_ocr.html  But I want magic. Direct to use lib.

# https://github.com/eihli/image-table-ocr

# Created a fork of this library : https://github.com/nitirajr/image-table-ocr


import os
import table_ocr.pdf_to_images
import table_ocr.extract_tables
import table_ocr.extract_cells
import table_ocr.ocr_image
import table_ocr.ocr_to_csv
from pathlib import Path

def extract_tables_from_pdf(pdf_path: str, csv_output_path: str) -> list[str]:
    """
    Extract tables from PDF and save them as separate CSV files.
    
    Args:
        pdf_path: Path to input PDF file
        csv_output_path: Base path for output CSV files (will add suffixes -1, -2 etc.)
    
    Returns:
        List of paths to generated CSV files
    """
    # Extract images from PDF
    pdf_images = table_ocr.pdf_to_images.pdf_to_images(pdf_path)
    
    # Process each image for tables
    csv_files = []
    table_count = 1
    
    for img_path in pdf_images:
        # Extract tables from the image
        table_results = table_ocr.extract_tables.main([img_path])
        
        for _, tables in table_results:
            # Process each table found in the image
            for table_img_path in tables:
                # Extract cells from table
                cell_paths = table_ocr.extract_cells.main(table_img_path)
                
                # OCR each cell
                ocr_results = []
                for cell_path in cell_paths:
                    text_path = table_ocr.ocr_image.main(cell_path, None)
                    ocr_results.append(text_path)
                
                # Convert OCR results to CSV
                csv_content = table_ocr.ocr_to_csv.text_files_to_csv(ocr_results)
                
                # Generate output CSV path with suffix
                output_base = Path(csv_output_path)
                output_path = f"{output_base.parent}/{output_base.stem}-{table_count}{output_base.suffix}"
                
                # Write CSV content
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(csv_content)
                
                csv_files.append(output_path)
                table_count += 1
    
    return csv_files

# Example usage:
# if __name__ == "__main__":
#     pdf_file = "/home/nitiraj/praroopai/mywork/the-bare-project/crawl4ai/webscraping_example/data/srkg_shishukunj_fees.pdf"  
#     csv_base = "output.csv"
#     csv_files = extract_tables_from_pdf(pdf_file, csv_base)
#     print(f"Generated CSV files: {csv_files}")
    

# Example usage: Jhalaria Jr. KG Fees
# if __name__ == "__main__":
#     pdf_file = "/home/nitiraj/praroopai/website-crawler/exp/filtered_bfs/pruning/19/downloads/jhalaria-campus/wp-content/uploads/2024/03/Jhalaria-Jr-KG-Fees-2024-25final.pdf.pdf"
#     csv_base = "/home/nitiraj/praroopai/website-crawler/exp/filtered_bfs/pruning/19/downloads/jhalaria-campus/wp-content/uploads/2024/03/Jhalaria-Jr-KG-Fees-2024-25final.pdf.csv"
#     csv_files = extract_tables_from_pdf(pdf_file, csv_base)
#     print(f"Generated CSV files: {csv_files}")

# Example usage: Jalaria Nursery Fees
if __name__ == "__main__":
    pdf_file = "/home/nitiraj/praroopai/website-crawler/exp/filtered_bfs/pruning/19/downloads/jhalaria-campus/wp-content/uploads/2024/03/Jhalaria-Nursery-Fees-2024-25final.pdf.pdf"
    csv_base = "/home/nitiraj/praroopai/website-crawler/exp/filtered_bfs/pruning/19/downloads/jhalaria-campus/wp-content/uploads/2024/03/Jhalaria-Nursery-Fees-2024-25final.pdf.csv"
    csv_files = extract_tables_from_pdf(pdf_file, csv_base)
    print(f"Generated CSV files: {csv_files}")
    
    
    https://www.shishukunj.in/jhalaria-campus/wp-content/uploads/2024/09/SV_-Nursery_Information-about-fees-2025-26.pdf
    
    https://www.shishukunj.in/jhalaria-campus/wp-content/uploads/2024/09/SV_-Nursery_Information-about-fees-2025-26.pdf