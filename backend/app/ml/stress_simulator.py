import math

from app.schemas.common import StressInput, StressOut


def simulate_stress(payload: StressInput) -> StressOut:
    new_revenue = payload.revenue * (1 - payload.revenue_drop_pct)
    new_costs = payload.fixed_costs + (payload.variable_costs * (1 + payload.cost_increase_pct))
    new_emi = payload.loan_emi * (1 + payload.emi_increase_pct)
    net_cash_flow = new_revenue - new_costs - new_emi

    if net_cash_flow >= 0:
        survival_months = float("inf")
        crash_month = 0
        emergency_fund = 0.0
        risk = "Low"
    else:
        survival_months = payload.cash_reserves / abs(net_cash_flow)
        crash_month = max(math.ceil(survival_months), 1)
        emergency_fund = abs(net_cash_flow) * 3
        if survival_months <= 3:
            risk = "High"
        elif survival_months <= 6:
            risk = "Medium"
        else:
            risk = "Low"

    return StressOut(
        survival_months=round(survival_months, 2) if survival_months != float("inf") else 999,
        crash_month=crash_month,
        emergency_fund_required=round(emergency_fund, 2),
        risk_level=risk,
    )
