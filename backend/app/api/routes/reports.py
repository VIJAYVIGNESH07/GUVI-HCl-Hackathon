from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user

router = APIRouter()


class ReportInput(BaseModel):
    business_name: str
    industry: str
    health_score: float
    bankruptcy_probability: float
    forecast: list[float]


@router.post("/investor-ready")
def investor_ready(payload: ReportInput, user=Depends(get_current_user)):
    summary = {
        "business_name": payload.business_name,
        "industry": payload.industry,
        "health_score": payload.health_score,
        "bankruptcy_probability": payload.bankruptcy_probability,
        "forecast_summary": {
            "next_3_periods": payload.forecast[:3],
            "trend": "up" if payload.forecast and payload.forecast[-1] > payload.forecast[0] else "flat",
        },
    }
    return {"report": summary}
