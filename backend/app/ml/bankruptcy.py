import math

from app.schemas.common import BankruptcyInput, BankruptcyOut


COEFFICIENTS = {
    "bias": -0.3,
    "profit_margin_trend": -1.1,
    "cash_flow_stability": -1.3,
    "receivable_delay_days": 0.02,
    "short_term_debt_growth": 0.9,
    "revenue_trend": -0.8,
}


def predict_bankruptcy(payload: BankruptcyInput) -> BankruptcyOut:
    z = COEFFICIENTS["bias"]
    z += COEFFICIENTS["profit_margin_trend"] * payload.profit_margin_trend
    z += COEFFICIENTS["cash_flow_stability"] * payload.cash_flow_stability
    z += COEFFICIENTS["receivable_delay_days"] * payload.receivable_delay_days
    z += COEFFICIENTS["short_term_debt_growth"] * payload.short_term_debt_growth
    z += COEFFICIENTS["revenue_trend"] * payload.revenue_trend

    probability = 1 / (1 + math.exp(-z))
    if probability >= 0.7:
        category = "High"
    elif probability >= 0.4:
        category = "Medium"
    else:
        category = "Low"

    factors = {
        "profit_margin_trend": payload.profit_margin_trend,
        "cash_flow_stability": payload.cash_flow_stability,
        "receivable_delay_days": payload.receivable_delay_days,
        "short_term_debt_growth": payload.short_term_debt_growth,
        "revenue_trend": payload.revenue_trend,
    }
    key_factor = max(factors, key=lambda k: abs(factors[k]))

    return BankruptcyOut(
        bankruptcy_probability=round(probability * 100, 2),
        risk_category=category,
        key_factor=key_factor,
    )
