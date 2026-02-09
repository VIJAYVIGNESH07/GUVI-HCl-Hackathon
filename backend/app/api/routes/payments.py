from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.core.config import settings
from app.core.deps import get_current_user
from app.services.payment_service import payment_service

router = APIRouter()


class CreateOrderIn(BaseModel):
    amount: int = Field(..., ge=1, description="Amount in smallest currency unit (paise)")
    currency: str = "INR"
    receipt: Optional[str] = None


@router.post("/order")
def create_order(payload: CreateOrderIn, user=Depends(get_current_user)):
    try:
        order = payment_service.create_order(payload.amount, payload.currency, payload.receipt)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return {
        "order_id": order.get("id"),
        "amount": order.get("amount"),
        "currency": order.get("currency"),
        "key_id": settings.razorpay_key_id,
    }
