import uuid
from typing import Any, Dict, Optional

import razorpay

from app.core.config import settings


class PaymentService:
    def _client(self) -> razorpay.Client:
        if not settings.razorpay_key_id or not settings.razorpay_key_secret:
            raise ValueError("Razorpay keys not configured")
        return razorpay.Client(auth=(settings.razorpay_key_id, settings.razorpay_key_secret))

    def create_order(self, amount: int, currency: str, receipt: Optional[str] = None) -> Dict[str, Any]:
        client = self._client()
        payload = {
            "amount": amount,
            "currency": currency,
            "receipt": receipt or f"fh_{uuid.uuid4().hex[:10]}",
            "payment_capture": 1,
        }
        return client.order.create(payload)


payment_service = PaymentService()
