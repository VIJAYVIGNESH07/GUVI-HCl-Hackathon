import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function StressSimulator() {
  const { token } = useAuth();
  const [form, setForm] = useState({
    revenue: "",
    fixed_costs: "",
    variable_costs: "",
    loan_emi: "",
    cash_reserves: "",
    receivable_delay_days: "",
    revenue_drop_pct: "",
    cost_increase_pct: "",
    emi_increase_pct: ""
  });
  const [result, setResult] = useState(null);

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSubmit = async () => {
    const payload = {
      revenue: Number(form.revenue),
      fixed_costs: Number(form.fixed_costs),
      variable_costs: Number(form.variable_costs),
      loan_emi: Number(form.loan_emi),
      cash_reserves: Number(form.cash_reserves),
      receivable_delay_days: Number(form.receivable_delay_days || 0),
      revenue_drop_pct: Number(form.revenue_drop_pct || 0),
      cost_increase_pct: Number(form.cost_increase_pct || 0),
      emi_increase_pct: Number(form.emi_increase_pct || 0)
    };
    const res = await apiPost("/api/stress/simulate", payload, token);
    setResult(res);
  };

  return (
    <div className="page">
      <SectionCard title="Business Stress Simulator">
        <div className="form-grid">
          <label>
            Revenue
            <input className="input" placeholder="INR" value={form.revenue} onChange={update("revenue")} />
          </label>
          <label>
            Fixed Costs
            <input className="input" placeholder="INR" value={form.fixed_costs} onChange={update("fixed_costs")} />
          </label>
          <label>
            Variable Costs
            <input className="input" placeholder="INR" value={form.variable_costs} onChange={update("variable_costs")} />
          </label>
          <label>
            Loan EMI
            <input className="input" placeholder="INR" value={form.loan_emi} onChange={update("loan_emi")} />
          </label>
          <label>
            Cash Reserves
            <input className="input" placeholder="INR" value={form.cash_reserves} onChange={update("cash_reserves")} />
          </label>
          <label>
            Receivable Delay (days)
            <input className="input" placeholder="0" value={form.receivable_delay_days} onChange={update("receivable_delay_days")} />
          </label>
          <label>
            Revenue Drop %
            <input className="input" placeholder="0.0" value={form.revenue_drop_pct} onChange={update("revenue_drop_pct")} />
          </label>
          <label>
            Cost Increase %
            <input className="input" placeholder="0.0" value={form.cost_increase_pct} onChange={update("cost_increase_pct")} />
          </label>
          <label>
            EMI Increase %
            <input className="input" placeholder="0.0" value={form.emi_increase_pct} onChange={update("emi_increase_pct")} />
          </label>
        </div>
        <button className="primary-btn" onClick={onSubmit}>
          Simulate Scenario
        </button>
        <div className="result-card">
          <div>
            <div className="label">Survival Months</div>
            <div className="value">{result ? result.survival_months : "--"}</div>
          </div>
          <div>
            <div className="label">Crash Month</div>
            <div className="value">{result ? result.crash_month : "--"}</div>
          </div>
          <div>
            <div className="label">Emergency Fund</div>
            <div className="value">
              {result ? `INR ${result.emergency_fund_required}` : "--"}
            </div>
          </div>
          <div>
            <div className="label">Risk Level</div>
            <div className={`value ${result?.risk_level === "High" ? "warning" : ""}`}>
              {result ? result.risk_level : "--"}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
