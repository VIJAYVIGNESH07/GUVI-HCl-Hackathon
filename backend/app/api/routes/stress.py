from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.schemas.common import StressInput
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.post("/simulate")
def simulate(payload: StressInput, user=Depends(get_current_user)):
    return analytics_service.stress(payload)
