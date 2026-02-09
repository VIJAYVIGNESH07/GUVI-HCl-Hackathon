from fastapi import APIRouter, Depends

from app.core.deps import get_current_user
from app.db.repositories import save_fraud_flags
from app.schemas.common import FraudInput
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.post("/detect")
def detect(payload: FraudInput, user=Depends(get_current_user)):
    result = analytics_service.fraud(payload)
    flags = []
    for tx in result.suspicious_transactions:
        if tx.id:
            flags.append(
                {
                    "transaction_id": tx.id,
                    "anomaly_score": 1.0,
                    "flag_reason": "Anomaly or duplicate",
                }
            )
    save_fraud_flags(flags)
    return result
