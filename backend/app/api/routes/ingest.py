from fastapi import APIRouter, Depends, File, UploadFile

from app.utils.ingestion import parse_csv_xlsx, parse_pdf_text
from app.core.deps import get_current_user

router = APIRouter()


@router.post("/financial-upload")
async def financial_upload(file: UploadFile = File(...), user=Depends(get_current_user)):
    contents = await file.read()
    data = parse_csv_xlsx(contents, file.filename)
    return {"rows": len(data), "sample": data[:5]}


@router.post("/statements-pdf")
async def statements_pdf(file: UploadFile = File(...), user=Depends(get_current_user)):
    contents = await file.read()
    text = parse_pdf_text(contents)
    return {"text_length": len(text), "preview": text[:500]}
