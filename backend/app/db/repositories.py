from typing import Any, Dict, Optional

from passlib.context import CryptContext

from app.db.supabase_client import get_supabase_client

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _client():
    supabase = get_supabase_client()
    if supabase is None:
        raise RuntimeError("Supabase client not configured")
    return supabase


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_user(name: str, email: str, role: str) -> Dict[str, Any]:
    supabase = _client()
    response = supabase.table("users").insert({"name": name, "email": email, "role": role}).execute()
    return response.data[0]


def create_user_credentials(user_id: str, password_hash: str) -> None:
    supabase = _client()
    supabase.table("user_credentials").insert(
        {"user_id": user_id, "password_hash": password_hash}
    ).execute()


def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    supabase = _client()
    response = supabase.table("users").select("*").eq("email", email).execute()
    if not response.data:
        return None
    return response.data[0]


def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    supabase = _client()
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    if not response.data:
        return None
    return response.data[0]


def get_credentials(user_id: str) -> Optional[Dict[str, Any]]:
    supabase = _client()
    response = supabase.table("user_credentials").select("*").eq("user_id", user_id).execute()
    if not response.data:
        return None
    return response.data[0]


def save_risk_score(business_id: str, health_score: float, bankruptcy_prob: float) -> None:
    supabase = _client()
    supabase.table("risk_scores").insert(
        {
            "business_id": business_id,
            "health_score": health_score,
            "bankruptcy_prob": bankruptcy_prob,
        }
    ).execute()


def save_fraud_flags(flags: list[dict[str, Any]]) -> None:
    if not flags:
        return
    supabase = _client()
    supabase.table("fraud_flags").insert(flags).execute()


def save_transactions(transactions: list[dict[str, Any]]) -> None:
    if not transactions:
        return
    supabase = _client()
    supabase.table("transactions").insert(transactions).execute()


def save_financial_statements(statements: list[dict[str, Any]]) -> None:
    if not statements:
        return
    supabase = _client()
    supabase.table("financial_statements").insert(statements).execute()


def save_loans(loans: list[dict[str, Any]]) -> None:
    if not loans:
        return
    supabase = _client()
    supabase.table("loans").insert(loans).execute()
