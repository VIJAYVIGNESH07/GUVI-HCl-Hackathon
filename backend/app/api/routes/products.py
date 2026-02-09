from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user

router = APIRouter()


class ProductInput(BaseModel):
    industry: str
    health_score: float
    revenue: float


@router.post("/recommend")
def recommend(payload: ProductInput, user=Depends(get_current_user)):
    tier = "prime" if payload.health_score >= 75 else "standard" if payload.health_score >= 50 else "caution"
    products = [
        {"name": "Working Capital Line", "tier": tier},
        {"name": "Invoice Discounting", "tier": tier},
        {"name": "SME Term Loan", "tier": tier},
    ]
    return {"recommended": products, "industry": payload.industry}
