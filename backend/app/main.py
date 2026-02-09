from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from app.api.routes import (
    auth,
    benchmark,
    compliance,
    data,
    forecast,
    fraud,
    health,
    ingest,
    insights,
    payments,
    products,
    reports,
    risk,
    stress,
)
from app.core.config import settings

app = FastAPI(
    title="Financial Health Assessment Tool",
    version="1.0.0",
    description="AI-driven financial health assessment for SMEs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(benchmark.router, prefix="/api/benchmark", tags=["benchmark"])
app.include_router(ingest.router, prefix="/api/ingest", tags=["ingest"])
app.include_router(data.router, prefix="/api/data", tags=["data"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(health.router, prefix="/api/health", tags=["health"])
app.include_router(risk.router, prefix="/api/risk", tags=["risk"])
app.include_router(stress.router, prefix="/api/stress", tags=["stress"])
app.include_router(fraud.router, prefix="/api/fraud", tags=["fraud"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["forecast"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["compliance"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])


@app.get("/api/healthcheck")
def healthcheck():
    return {"status": "ok"}
