from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user

router = APIRouter()


class ComplianceInput(BaseModel):
    gst_filing_status: str
    tax_deductions: float
    filing_periods_missed: int = 0


@router.post("/gst-check")
def gst_check(payload: ComplianceInput, user=Depends(get_current_user)):
    issues = []
    if payload.filing_periods_missed > 0:
        issues.append("Missed GST filing periods detected")
    if payload.tax_deductions <= 0:
        issues.append("No tax deductions claimed")
    status = "Compliant" if not issues else "Needs Attention"
    return {"status": status, "issues": issues}
