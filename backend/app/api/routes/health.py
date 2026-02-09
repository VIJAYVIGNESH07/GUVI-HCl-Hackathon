from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.db.repositories import save_risk_score
from app.schemas.common import HealthScoreInput
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.post("/score")
def health_score(payload: HealthScoreInput, user=Depends(get_current_user)):
    result = analytics_service.health_score(payload)
    if payload.business_id:
        save_risk_score(payload.business_id, result.health_score, 0.0)
    return result
