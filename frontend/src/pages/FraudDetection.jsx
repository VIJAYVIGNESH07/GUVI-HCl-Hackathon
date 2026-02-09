import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function FraudDetection() {
  const { token } = useAuth();
  const [result, setResult] = useState(null);

  const runDetection = async () => {
    const payload = {
      transactions: [
        {
          business_id: "demo",
          amount: 120000,
          category: "Logistics",
          vendor: "Zen Freight",
          date: "2026-01-18"
        },
        {
          business_id: "demo",
          amount: 120000,
          category: "Logistics",
          vendor: "Zen Freight",
          date: "2026-01-18"
        },
        {
          business_id: "demo",
          amount: 45000,
          category: "Supplies",
          vendor: "Prime Supplies",
          date: "2026-01-12"
        }
      ]
    };
    const res = await apiPost("/api/fraud/detect", payload, token);
    setResult(res);
  };

  return (
    <div className="page">
      <SectionCard title="Fraud & Leakage Detector">
        <div className="table">
          <div className="table-row header">
            <div>Vendor</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Flag</div>
          </div>
          {(result?.suspicious_transactions || []).map((tx, i) => (
            <div className="table-row" key={i}>
              <div>{tx.vendor}</div>
              <div>{tx.category}</div>
              <div>{`INR ${tx.amount}`}</div>
              <div>{tx.date}</div>
              <div className="pill danger">Anomaly</div>
            </div>
          ))}
        </div>
        <button className="primary-btn" onClick={runDetection}>
          Run Detection
        </button>
        <div className="result-card">
          <div>
            <div className="label">Possible Loss</div>
            <div className="value">
              {result ? `INR ${result.possible_loss_estimate}` : "--"}
            </div>
          </div>
          <div>
            <div className="label">Risk Severity</div>
            <div className="value warning">
              {result ? result.risk_severity : "--"}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
