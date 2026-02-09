from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from jose import jwt

from app.core.config import settings


def create_access_token(subject: str, extra: Optional[Dict[str, Any]] = None) -> str:
    payload: Dict[str, Any] = {"sub": subject}
    if extra:
        payload.update(extra)
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_exp_minutes)
    payload["exp"] = expire
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
