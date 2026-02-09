import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Reports() {
  const { token } = useAuth();
  const [form, setForm] = useState({
    business_name: "",
    industry: "",
    health_score: "",
    bankruptcy_probability: ""
  });
  const [report, setReport] = useState(null);

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const generate = async () => {
    const res = await apiPost(
      "/api/reports/investor-ready",
      {
        business_name: form.business_name || "Acme Industries",
        industry: form.industry || "Manufacturing",
        health_score: Number(form.health_score || 82),
        bankruptcy_probability: Number(form.bankruptcy_probability || 12),
        forecast: [1200, 1280, 1350, 1400]
      },
      token
    );
    setReport(res.report);
  };

  return (
    <div className="page">
      <SectionCard title="Investor-Ready Report">
        <div className="grid two-col">
          <div className="stack">
            <label className="stack">
              Business Name
              <input
                className="input"
                placeholder="Acme Industries"
                value={form.business_name}
                onChange={update("business_name")}
              />
            </label>
            <label className="stack">
              Industry
              <input
                className="input"
                placeholder="Manufacturing"
                value={form.industry}
                onChange={update("industry")}
              />
            </label>
            <label className="stack">
              Health Score
              <input
                className="input"
                placeholder="82"
                value={form.health_score}
                onChange={update("health_score")}
              />
            </label>
            <label className="stack">
              Bankruptcy Probability
              <input
                className="input"
                placeholder="12"
                value={form.bankruptcy_probability}
                onChange={update("bankruptcy_probability")}
              />
            </label>
            <button className="primary-btn" onClick={generate}>
              Generate Report
            </button>
          </div>
          <div className="report-card">
            <h4>Executive Summary</h4>
            <p>
              {report
                ? `Health score ${report.health_score} with projected trend ${report.forecast_summary.trend}.`
                : "Generate a report to view the executive summary."}
            </p>
            <div className="pill success">Ready for Investors</div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
