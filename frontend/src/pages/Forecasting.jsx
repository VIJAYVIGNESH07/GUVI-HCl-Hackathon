import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import TrendChart from "../components/TrendChart.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Forecasting() {
  const { token } = useAuth();
  const [history, setHistory] = useState("950,1020,1100,1200,1280,1350");
  const [forecast, setForecast] = useState([]);
  const [method, setMethod] = useState("");

  const runForecast = async () => {
    const values = history
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !Number.isNaN(v));
    const res = await apiPost("/api/forecast/revenue", { historical_revenue: values }, token);
    setMethod(res.method);
    setForecast(
      res.forecast.map((value, idx) => ({
        month: `M${idx + 1}`,
        value
      }))
    );
  };

  return (
    <div className="page">
      <SectionCard title="Forecasting & Working Capital">
        <div className="grid two-col">
          <div>
            <div className="label">Prediction Model</div>
            <div className="value">
              {method ? method.toUpperCase() : "Prophet (auto fallback to ARIMA)"}
            </div>
            <p className="muted">
              Forecast includes revenue, cash flow, and working capital trend.
            </p>
            <label className="stack">
              Historical Revenue (comma separated)
              <input
                className="input"
                value={history}
                onChange={(e) => setHistory(e.target.value)}
              />
            </label>
            <button className="primary-btn" onClick={runForecast}>
              Run Forecast
            </button>
          </div>
          <TrendChart data={forecast.length ? forecast : undefined} />
        </div>
      </SectionCard>
    </div>
  );
}
