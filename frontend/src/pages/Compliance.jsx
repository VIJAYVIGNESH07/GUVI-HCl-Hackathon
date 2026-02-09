import { useState } from "react";
import SectionCard from "../components/SectionCard.jsx";
import { apiPost } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Compliance() {
  const { token } = useAuth();
  const [form, setForm] = useState({
    gst_filing_status: "",
    tax_deductions: "",
    filing_periods_missed: ""
  });
  const [result, setResult] = useState(null);

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const validate = async () => {
    const res = await apiPost(
      "/api/compliance/gst-check",
      {
        gst_filing_status: form.gst_filing_status || "Filed",
        tax_deductions: Number(form.tax_deductions || 0),
        filing_periods_missed: Number(form.filing_periods_missed || 0)
      },
      token
    );
    setResult(res);
  };

  return (
    <div className="page">
      <SectionCard title="GST & Tax Compliance">
        <div className="grid two-col">
          <div>
            <label className="stack">
              GST Filing Status
              <input
                className="input"
                placeholder="Filed"
                value={form.gst_filing_status}
                onChange={update("gst_filing_status")}
              />
            </label>
            <label className="stack">
              Tax Deductions Claimed
              <input
                className="input"
                placeholder="INR"
                value={form.tax_deductions}
                onChange={update("tax_deductions")}
              />
            </label>
            <label className="stack">
              Missed Filing Periods
              <input
                className="input"
                placeholder="0"
                value={form.filing_periods_missed}
                onChange={update("filing_periods_missed")}
              />
            </label>
            <button className="primary-btn" onClick={validate}>
              Validate Compliance
            </button>
          </div>
          <div className="result-card">
            <div>
              <div className="label">Status</div>
              <div className="value">{result ? result.status : "--"}</div>
            </div>
            <div>
              <div className="label">Issues</div>
              <div className="value">
                {result ? (result.issues.length ? result.issues.join(", ") : "None") : "--"}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
