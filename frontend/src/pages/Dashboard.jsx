import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import StatCard from "../components/StatCard.jsx";
import TrendChart from "../components/TrendChart.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { token } = useAuth();
  const [healthScore, setHealthScore] = useState(null);
  const [bankruptcy, setBankruptcy] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [benchmark, setBenchmark] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const health = await apiPost(
          "/api/health/score",
          {
            revenue: 1200000,
            expenses: 820000,
            profit: 380000,
            receivable_days: 18,
            payable_days: 30,
            current_assets: 1600000,
            current_liabilities: 950000
          },
          token
        );
        setHealthScore(health);
        const risk = await apiPost(
          "/api/risk/bankruptcy",
          {
            profit_margin_trend: 0.15,
            cash_flow_stability: 0.2,
            receivable_delay_days: 12,
            short_term_debt_growth: 0.1,
            revenue_trend: 0.18
          },
          token
        );
        setBankruptcy(risk);
        const forecastRes = await apiPost(
          "/api/forecast/revenue",
          { historical_revenue: [950, 1020, 1100, 1200, 1280, 1350] },
          token
        );
        setForecast(
          forecastRes.forecast.map((value, idx) => ({
            month: `M${idx + 1}`,
            value
          }))
        );
        const bench = await apiPost(
          "/api/benchmark/industry",
          { industry: "Manufacturing", ebitda_margin: 18.4, revenue_growth: 9.3 },
          token
        );
        setBenchmark(bench);
      } catch (err) {
        // keep default placeholders if API not reachable
      }
    };
    if (token) load();
  }, [token]);

  return (
    <div className="page">
      <div className="grid stats-grid">
        <StatCard
          title="Health Score"
          value={healthScore ? healthScore.health_score : "--"}
          note={healthScore ? `${healthScore.risk_level} risk` : "Loading"}
        />
        <StatCard
          title="Bankruptcy Risk"
          value={bankruptcy ? `${bankruptcy.bankruptcy_probability}%` : "--"}
          note={bankruptcy ? `${bankruptcy.risk_category} risk` : "Loading"}
        />
        <StatCard title="Working Capital" value="INR 4.6M" note="Improving cycle" />
        <StatCard title="Fraud Alerts" value="3" note="Review vendor spikes" />
      </div>

      <div className="grid two-col">
        <SectionCard title="Revenue Forecast">
          <TrendChart data={forecast.length ? forecast : undefined} />
        </SectionCard>
        <SectionCard
          title="Key Insights"
          action={<button className="ghost-btn">Generate Report</button>}
        >
          <ul className="insight-list">
            <li>Operating margin improved by 3.2% over last quarter.</li>
            <li>Receivable delay reduced to 12 days.</li>
            <li>Vendor pricing volatility detected in logistics spend.</li>
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Industry Benchmarking">
        <div className="benchmark-grid">
          <div>
            <div className="label">Your EBITDA Margin</div>
            <div className="value">18.4%</div>
          </div>
          <div>
            <div className="label">Industry Median</div>
            <div className="value">
              {benchmark ? `${benchmark.benchmark.median_ebitda_margin}%` : "14.2%"}
            </div>
          </div>
          <div>
            <div className="label">Top Quartile</div>
            <div className="value">
              {benchmark ? `${benchmark.benchmark.top_quartile_ebitda_margin}%` : "21.6%"}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
