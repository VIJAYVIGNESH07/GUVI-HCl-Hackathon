# Financial Health Assessment Tool

AI-powered financial health assessment platform for SMEs that delivers risk scoring, stress simulations, fraud detection, forecasting, compliance checks, and investor-ready reporting.

## Features
- Financial health scoring and risk alerts
- Business stress simulator with survival analysis
- Bankruptcy prediction (logistic regression)
- Fraud and leakage detection (duplicate detection + z-score anomalies)
- Revenue forecasting (Prophet with ARIMA fallback)
- GST and tax compliance validation
- Industry benchmarking and investor-ready report drafts
- Multilingual-ready UI (English, Hindi, regional placeholder)
- Supabase PostgreSQL schema aligned to system spec

## Architecture
- **Frontend**: React + Recharts with a dark finance/health theme
- **Backend**: FastAPI with modular ML/AI services
- **Data**: pandas processing, pdfplumber + openpyxl ingestion
- **Models**: scikit-learn compatible logic, Prophet/ARIMA forecasting
- **Database**: Supabase PostgreSQL (schema in `backend/db/schema.sql`)
- **Security**: JWT auth, TLS in transit, AES-256 at rest (via Supabase)

## Repository Structure
- `backend/` FastAPI backend and ML services
- `backend/app/` application modules
- `backend/db/schema.sql` Supabase schema
- `frontend/` React UI

## Backend Setup
1. Create a virtual environment and install dependencies.
2. Copy `backend/.env.example` to `backend/.env` and set values.
3. Run the server.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Frontend Setup
1. Install dependencies.
2. Run the dev server.

```bash
cd frontend
npm install
npm run dev
```

> `npm run dev` in `frontend/` now starts both frontend and backend.
> Use `npm run dev:frontend` if you only want the UI.

## One-Command Dev (Windows PowerShell)
Run both backend and frontend in separate terminals:
```powershell
.\dev.ps1
```

## Core API Endpoints
- `POST /api/ingest/financial-upload` CSV/XLSX ingest
- `POST /api/ingest/statements-pdf` PDF statement ingest
- `POST /api/health/score` Financial health scoring
- `POST /api/benchmark/industry` Industry benchmarking
- `POST /api/risk/bankruptcy` Bankruptcy prediction
- `POST /api/stress/simulate` Business stress simulation
- `POST /api/fraud/detect` Fraud and leakage detection
- `POST /api/forecast/revenue` Revenue forecasting
- `POST /api/data/financial-statements` Save financial statements
- `POST /api/data/transactions` Save transactions
- `POST /api/data/loans` Save loan records
- `POST /api/compliance/gst-check` GST compliance validation
- `POST /api/insights/translate` Multilingual translation via Groq
- `POST /api/payments/order` Razorpay order creation
- `POST /api/products/recommend` Financial product recommendations
- `POST /api/reports/investor-ready` Investor-ready report summary

## AI Modules (Per Specification)
- **Stress Simulator**: Calculates revenue impact, survival months, emergency fund need
- **Bankruptcy Prediction**: Logistic regression probability using financial indicators
- **Fraud Detector**: Duplicate detection + anomaly scoring (z-score)
- **Forecasting**: Prophet with ARIMA fallback and linear backup
- **Multilingual**: Groq LLM translation endpoint

## Supabase Schema
Apply the schema from `backend/db/schema.sql` in Supabase SQL editor or via migration tool.

## Notes on Security
- Use HTTPS for all traffic in production
- Store secrets in environment variables
- Enable Supabase Row Level Security and role-based access
- Mask sensitive data at the UI/API layer before display

## Razorpay Setup (Optional)
Add Razorpay keys to `backend/.env`:
```
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxxxxxxx
```
The frontend "Connect Razorpay" button will open a test checkout using these keys.

## Next Enhancements (Optional)
- Connect live banking APIs
- Add actual ML model training pipeline
- Export PDFs for investor reports
- Add audit logging and alerts

## License
Internal project template. Update as needed.
