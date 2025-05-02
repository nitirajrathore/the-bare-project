import camelot
import pdfplumber
from tabulate import tabulate
import argparse
import traceback
import os

def extract_tables(*, input_pdf: str, output_csv: str) -> None:
    # Verify file existence and permissions
    if not os.path.exists(input_pdf):
        raise FileNotFoundError(f"File does not exist: {input_pdf}")
    if not os.access(input_pdf, os.R_OK):
        raise PermissionError(f"Cannot read file: {input_pdf}")
    
    print(f"Attempting to read: {input_pdf}")
    tables = camelot.read_pdf(input_pdf, flavor="lattice",)
    print(f"tables object: {tables}")
    for t in tables:
        print(f"table : ", t)
        t.to_csv(output_csv)

def main():
    parser = argparse.ArgumentParser(description='Extract tables from PDF file')
    parser.add_argument('--input-pdf', required=True, help='Path to the input PDF file')
    parser.add_argument('--output-csv', required=True, help='Path to the output CSV file')
    args = parser.parse_args()
    
    try:
        extract_tables(input_pdf=args.input_pdf, output_csv=args.output_csv)
        # with open(args.output_csv, 'r') as f:
        #     print(f.read())
    except FileNotFoundError as e:
        print(f"Error: {str(e)}")
        print("Stack trace:")
        traceback.print_exc()
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        print("Stack trace:")
        traceback.print_exc()

if __name__ == "__main__":
    main()



# Extracted one table from : data/aps-boarder-1st_8th.pdf 

# better results with flavour stream - 3 tables found  -- best results saved with csv / excel.

# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/stream-aps-boarder-1st_8th.md --format markdown stream data/aps-boarder-1st_8th.pdf 
# Found 3 tables
# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/aps-boarder-1st_8th.md --format markdown hybrid data/aps-boarder-1st_8th.pdf 
# /home/nitiraj/praroopai/mywork/the-bare-project/crawl4ai/webscraping_example/.venv/lib/python3.12/site-packages/camelot/parsers/hybrid.py:161: FutureWarning: Downcasting behavior in `replace` is deprecated and will be removed in a future version. To retain the old behavior, explicitly call `result.infer_objects(copy=False)`. To opt-in to the future behavior, set `pd.set_option('future.no_silent_downcasting', True)`
#   table.df = table.df.replace("", np.nan)
# Found 1 tables

####################################
#  NO TABLES FOUND for data/srkg_shishukunj_fees.pdf as this pdf is image based.

# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/srkg_shishukunj_fees.md --format markdown hybrid data/srkg_shishukunj_fees.pdf 
# CropBox missing from /Page, defaulting to MediaBox
# /home/nitiraj/praroopai/mywork/the-bare-project/crawl4ai/webscraping_example/.venv/lib/python3.12/site-packages/camelot/parsers/base.py:124: UserWarning: page-1 is image-based, camelot only works on text-based pages.
#   warnings.warn(
# Found 0 tables


###################################
# /data/fees_shishukunj.pdf  -- got 2 tables with 'stream' flavor.

# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/fees-shishukunj.md --format markdown hybrid data/fees_shishukunj.pdf 
# Found 0 tables
# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/fees-shishukunj.md --format markdown lattice data/fees_shishukunj.pdf 
# Found 0 tables
# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/fees-shishukunj.md --format markdown stream data/fees_shishukunj.pdf 
# Found 2 tables
# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/fees-shishukunj.md --format markdown network data/fees_shishukunj.pdf 
# Found 0 tables

### 
# 3 tables found with 'lattice' flavor data/NC_-Jr-KG-to-X-fees-2025-26.shishukunj.pdf.pdf

# .venvLAPTOP-SS6M034M:webscraping_example $ camelot --output data/lattice-NC_-Jr-KG-to-X-fees-2025-26.shishukunj.pdf.csv --format csv lattice data/NC_-Jr-KG-to-X-fees-2025-26.shishukunj.pdf.pdf 
# Found 3 tables

