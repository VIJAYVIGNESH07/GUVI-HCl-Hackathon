from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user

router = APIRouter()


class BenchmarkInput(BaseModel):
    industry: str
    ebitda_margin: float
    revenue_growth: float


@router.post("/industry")
def industry_benchmark(payload: BenchmarkInput, user=Depends(get_current_user)):
    benchmark = {
        "industry": payload.industry,
        "median_ebitda_margin": 14.2,
        "top_quartile_ebitda_margin": 21.6,
        "median_revenue_growth": 7.1,
    }
    comparison = {
        "ebitda_vs_median": round(payload.ebitda_margin - benchmark["median_ebitda_margin"], 2),
        "growth_vs_median": round(payload.revenue_growth - benchmark["median_revenue_growth"], 2),
    }
    return {"benchmark": benchmark, "comparison": comparison}
