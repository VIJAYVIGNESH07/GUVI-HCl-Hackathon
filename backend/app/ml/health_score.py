from app.schemas.common import HealthScoreInput, HealthScoreOut


def compute_health_score(payload: HealthScoreInput) -> HealthScoreOut:
    profitability = payload.profit / max(payload.revenue, 1.0)
    expense_ratio = payload.expenses / max(payload.revenue, 1.0)
    liquidity = payload.current_assets / max(payload.current_liabilities, 1.0)
    working_capital_cycle = max(payload.receivable_days - payload.payable_days, 0)

    score = 0.0
    score += max(min(profitability * 60, 60), -20)
    score += max(min((1 - expense_ratio) * 25, 25), -10)
    score += max(min((liquidity - 1) * 15, 15), -10)
    score -= min(working_capital_cycle * 0.1, 15)

    normalized = max(min(score + 40, 100), 0)
    if normalized >= 75:
        level = "Low"
    elif normalized >= 50:
        level = "Medium"
    else:
        level = "High"
    return HealthScoreOut(health_score=round(normalized, 2), risk_level=level)
