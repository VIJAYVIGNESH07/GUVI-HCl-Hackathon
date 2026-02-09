from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.schemas.common import ForecastInput
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.post("/revenue")
def revenue_forecast(payload: ForecastInput, user=Depends(get_current_user)):
    return analytics_service.forecast(payload)
