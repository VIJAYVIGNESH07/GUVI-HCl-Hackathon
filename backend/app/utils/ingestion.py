import io
from typing import Any

import pandas as pd
import pdfplumber


def parse_csv_xlsx(contents: bytes, filename: str) -> list[dict[str, Any]]:
    buffer = io.BytesIO(contents)
    if filename.endswith(".csv"):
        df = pd.read_csv(buffer)
    else:
        df = pd.read_excel(buffer)
    return df.to_dict(orient="records")


def parse_pdf_text(contents: bytes) -> str:
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    return text.strip()
