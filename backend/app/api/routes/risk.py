from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.db.repositories import save_risk_score
from app.schemas.common import BankruptcyInput
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.post("/bankruptcy")
def bankruptcy(payload: BankruptcyInput, user=Depends(get_current_user)):
    result = analytics_service.bankruptcy(payload)
    if payload.business_id:
        save_risk_score(payload.business_id, 0.0, result.bankruptcy_probability)
    return result
