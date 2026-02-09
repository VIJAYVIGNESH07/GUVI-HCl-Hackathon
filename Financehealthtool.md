You are a senior fintech software architect, AI engineer, and full-stack developer.

Your task is to **build a complete production-ready web application** strictly based on the system specification provided below. Do not skip any requirement. Implement every module, feature, database table, AI model, and UI component described.

The application name is: **Financial Health Assessment Tool**

# 📊 Financial Health Assessment Tool  

## 1. Problem Description

Small and Medium Enterprises (SMEs) often lack access to advanced financial analytics, risk prediction tools, and expert advisory systems. This platform provides an AI-driven financial health assessment system that:

- Analyzes financial statements and cash flow patterns  
- Evaluates creditworthiness  
- Identifies financial risks  
- Suggests cost optimization strategies  
- Recommends suitable financial products (banks/NBFCs)  
- Assists with bookkeeping and tax compliance  
- Performs forecasting and working capital optimization  
- Integrates with GST returns and banking APIs  
- Supports industry benchmarking  
- Generates investor-ready reports  
- Provides multilingual support  
- Ensures high security and regulatory compliance  

---

## 2. System Objectives

- Financial health scoring  
- Early bankruptcy prediction  
- Business stress scenario simulation  
- Fraud & leakage detection  
- Cash flow and working capital optimization  
- GST and tax compliance validation  
- Industry benchmarking  
- Investor-ready reporting  
- Multilingual explanation for non-finance users  

---

## 3. Unique AI Features (Innovation Layer)

### 3.1 Business Stress Simulator

Simulates financial “what-if” scenarios.

**Inputs**
- Revenue
- Fixed & variable costs
- Loan EMIs
- Cash reserves
- Receivable delay

**Simulated Scenarios**
- Revenue drop
- Cost increase
- EMI increase
- Delayed payments

**Core Logic**

New Revenue = Revenue × (1 - Drop%)
New Costs = Fixed + (Variable × Increase%)
Net Cash Flow = New Revenue - New Costs - EMI
Survival Months = Cash Reserves / |Net Cash Flow|


**Outputs**
- Survival duration
- Crash month
- Emergency fund requirement
- Risk level

---

### 3.2 Future Bankruptcy Prediction

Predicts financial distress 6–12 months in advance.

**Indicators Used**
- Profit margin trend
- Cash flow stability
- Receivable delay
- Short-term debt growth
- Revenue trend

**Model**
Logistic Regression
P(Bankruptcy) = 1 / (1 + e^-(β0 + β1X1 + β2X2 + ...))


**Outputs**
- Bankruptcy probability (%)
- Risk category
- Key contributing factor

---

### 3.3 Fraud & Leakage Detector

Detects hidden financial losses.

**Detection Methods**
- Duplicate transaction matching
- Z-score anomaly detection
- Vendor pricing trend deviation
- Time-series expense spikes

**Z-score Formula**
Z = (Value - Mean) / StdDev


**Outputs**
- Suspicious transactions
- Possible loss estimate
- Risk severity

---

## 4. Data Requirements

### 4.1 Supported Input Sources

| Source | Format |
|--------|-------|
| Financial Upload | CSV / XLSX |
| Statements | PDF (text-based) |
| Banking APIs (max 2) | Transactions |
| GST Data (optional) | Filing records |

---

### 4.2 Data Dimensions

- Revenue streams  
- Cost structures  
- Expense categories  
- Accounts receivable/payable  
- Inventory levels  
- Loan/credit obligations  
- Tax deductions  
- Compliance metadata  

---

## 5. Industry Segmentation

- Manufacturing  
- Retail  
- Agriculture  
- Services  
- Logistics  
- E-commerce  

---

## 6. AI & Analytics Modules

| Module | Purpose |
|--------|---------|
| Financial Health Score | Overall health evaluation |
| Risk Detection | Identify financial threats |
| Forecasting | Revenue & cash flow prediction |
| Working Capital Optimizer | Improve liquidity |
| Compliance Checker | GST & tax verification |

---

## 7. Multilingual Support

- English  
- Hindi  
- Regional language translation via LLM  

---

## 8. Technology Stack (MANDATORY)

| Layer | Technology |
|------|------------|
| LLM Layer | **Groq LLM API** |
| Data Processing | Python + pandas |
| Backend | FastAPI |
| Frontend | React.js |
| Database | **Supabase PostgreSQL** |
| ML Models | Scikit-learn |
| Forecasting | Prophet / ARIMA |
| PDF Parsing | pdfplumber |
| Excel Handling | openpyxl |
| Authentication | JWT |
| Visualization | Chart.js / Recharts |

---

## 9. Database Schema (Supabase PostgreSQL)

### users
| Field | Type |
|------|------|
| id | UUID (PK) |
| name | TEXT |
| email | TEXT |
| role | TEXT |
| created_at | TIMESTAMP |

### businesses
| Field | Type |
|------|------|
| id | UUID (PK) |
| user_id | UUID (FK) |
| industry | TEXT |
| language_pref | TEXT |

### financial_statements
| Field | Type |
|------|------|
| business_id | UUID |
| revenue | FLOAT |
| expenses | FLOAT |
| profit | FLOAT |
| period | DATE |

### transactions
| Field | Type |
|------|------|
| id | UUID |
| business_id | UUID |
| amount | FLOAT |
| category | TEXT |
| vendor | TEXT |
| date | DATE |

### loans
| Field | Type |
|------|------|
| business_id | UUID |
| principal | FLOAT |
| emi | FLOAT |
| interest_rate | FLOAT |

### risk_scores
| Field | Type |
|------|------|
| business_id | UUID |
| health_score | FLOAT |
| bankruptcy_prob | FLOAT |

### fraud_flags
| Field | Type |
|------|------|
| transaction_id | UUID |
| anomaly_score | FLOAT |
| flag_reason | TEXT |

---

## 10. Security Requirements

- AES-256 encryption at rest  
- TLS encryption in transit  
- Role-based access control  
- Data masking  


## 11. Output Deliverables

- Financial health score  
- Risk alerts  
- Forecast charts  
- Fraud detection reports  
- Stress simulation results  
- Investor-ready financial report  

## 12. System Workflow

Data Ingestion → Processing → ML Models → AI Insights → Dashboard Visualization


---

## 13. Project Title

**Financial Health Assessment Tool**



