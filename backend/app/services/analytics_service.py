from app.ml.bankruptcy import predict_bankruptcy
from app.ml.fraud import detect_fraud
from app.ml.forecasting import forecast_revenue
from app.ml.health_score import compute_health_score
from app.ml.stress_simulator import simulate_stress
from app.schemas.common import (
    BankruptcyInput,
    FraudInput,
    ForecastInput,
    HealthScoreInput,
    StressInput,
)


class AnalyticsService:
    def health_score(self, payload: HealthScoreInput):
        return compute_health_score(payload)

    def bankruptcy(self, payload: BankruptcyInput):
        return predict_bankruptcy(payload)

    def fraud(self, payload: FraudInput):
        return detect_fraud(payload)

    def stress(self, payload: StressInput):
        return simulate_stress(payload)

    def forecast(self, payload: ForecastInput):
        return forecast_revenue(payload.historical_revenue)


analytics_service = AnalyticsService()
