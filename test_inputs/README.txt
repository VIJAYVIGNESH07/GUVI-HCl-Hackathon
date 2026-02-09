Test Inputs for Financial Health Assessment Tool

How to use
1) Replace BUSINESS_ID_HERE with a real business UUID from Supabase where required.
2) Use these files with the API endpoints below.

JSON payloads
- health_score.json -> POST /api/health/score
- bankruptcy.json -> POST /api/risk/bankruptcy
- stress.json -> POST /api/stress/simulate
- fraud.json -> POST /api/fraud/detect
- forecast.json -> POST /api/forecast/revenue
- compliance.json -> POST /api/compliance/gst-check
- benchmark.json -> POST /api/benchmark/industry
- reports.json -> POST /api/reports/investor-ready
- payment_order.json -> POST /api/payments/order
- data_financial_statements.json -> POST /api/data/financial-statements
- data_transactions.json -> POST /api/data/transactions
- data_loans.json -> POST /api/data/loans

CSV uploads
- ingest_financial_upload.csv -> POST /api/ingest/financial-upload
- ingest_transactions.csv -> Use with your own ingestion flow if needed

PDF upload
- Convert ingest_statement_sample.txt to PDF and upload -> POST /api/ingest/statements-pdf

Example curl (requires auth token)
- curl -X POST http://127.0.0.1:8000/api/health/score -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d @test_inputs/health_score.json
