from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.core.config import settings
from app.services.llm_service import llm_service

router = APIRouter()


class TranslateInput(BaseModel):
    text: str
    target_language: str


@router.post("/translate")
async def translate(payload: TranslateInput):
    if not settings.groq_api_key:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GROQ_API_KEY not configured",
        )
    translated = await llm_service.translate(payload.text, payload.target_language)
    return {"translated": translated}
