from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user
from app.db.repositories import save_financial_statements, save_loans, save_transactions
from app.schemas.common import FinancialStatementIn, LoanIn, TransactionIn

router = APIRouter()


class FinancialStatementsBatch(BaseModel):
    items: list[FinancialStatementIn]


class TransactionsBatch(BaseModel):
    items: list[TransactionIn]


class LoansBatch(BaseModel):
    items: list[LoanIn]


@router.post("/financial-statements")
def create_financial_statements(payload: FinancialStatementsBatch, user=Depends(get_current_user)):
    save_financial_statements([item.model_dump() for item in payload.items])
    return {"status": "ok", "count": len(payload.items)}


@router.post("/transactions")
def create_transactions(payload: TransactionsBatch, user=Depends(get_current_user)):
    save_transactions([item.model_dump() for item in payload.items])
    return {"status": "ok", "count": len(payload.items)}


@router.post("/loans")
def create_loans(payload: LoansBatch, user=Depends(get_current_user)):
    save_loans([item.model_dump() for item in payload.items])
    return {"status": "ok", "count": len(payload.items)}
