from datetime import date
from typing import Optional
from pydantic import BaseModel, Field


class FinancialStatementIn(BaseModel):
    business_id: str
    revenue: float
    expenses: float
    profit: float
    period: date


class TransactionIn(BaseModel):
    id: Optional[str] = None
    business_id: str
    amount: float
    category: str
    vendor: str
    date: date


class LoanIn(BaseModel):
    business_id: str
    principal: float
    emi: float
    interest_rate: float


class StressInput(BaseModel):
    revenue: float
    fixed_costs: float
    variable_costs: float
    loan_emi: float
    cash_reserves: float
    receivable_delay_days: int = Field(default=0, ge=0)
    revenue_drop_pct: float = Field(default=0.0, ge=0.0, le=1.0)
    cost_increase_pct: float = Field(default=0.0, ge=0.0, le=1.0)
    emi_increase_pct: float = Field(default=0.0, ge=0.0, le=1.0)


class BankruptcyInput(BaseModel):
    business_id: Optional[str] = None
    profit_margin_trend: float
    cash_flow_stability: float
    receivable_delay_days: int
    short_term_debt_growth: float
    revenue_trend: float


class FraudInput(BaseModel):
    transactions: list[TransactionIn]


class ForecastInput(BaseModel):
    historical_revenue: list[float]


class HealthScoreInput(BaseModel):
    business_id: Optional[str] = None
    revenue: float
    expenses: float
    profit: float
    receivable_days: int
    payable_days: int
    current_assets: float
    current_liabilities: float


class HealthScoreOut(BaseModel):
    health_score: float
    risk_level: str


class BankruptcyOut(BaseModel):
    bankruptcy_probability: float
    risk_category: str
    key_factor: str


class FraudOut(BaseModel):
    suspicious_transactions: list[TransactionIn]
    possible_loss_estimate: float
    risk_severity: str


class ForecastOut(BaseModel):
    forecast: list[float]
    method: str


class StressOut(BaseModel):
    survival_months: float
    crash_month: int
    emergency_fund_required: float
    risk_level: str
