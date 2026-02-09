from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.security import create_access_token
from app.db.repositories import (
    create_user,
    create_user_credentials,
    get_credentials,
    get_user_by_email,
    hash_password,
    verify_password,
)

router = APIRouter()


class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(payload: RegisterIn):
    existing = get_user_by_email(payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    user = create_user(payload.name, payload.email, "user")
    create_user_credentials(user["id"], hash_password(payload.password))
    token = create_access_token(user["id"], extra={"role": user["role"], "email": user["email"]})
    return {"message": "registered", "access_token": token, "user": user}


@router.post("/login")
def login(payload: LoginIn):
    user = get_user_by_email(payload.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    creds = get_credentials(user["id"])
    if not creds or not verify_password(payload.password, creds["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(user["id"], extra={"role": user["role"], "email": user["email"]})
    return {"access_token": token, "token_type": "bearer", "user": user}
