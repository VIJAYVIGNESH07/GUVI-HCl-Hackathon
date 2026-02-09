import SectionCard from "../components/SectionCard.jsx";

export default function Settings() {
  return (
    <div className="page">
      <SectionCard title="User & Business Settings">
        <div className="grid two-col">
          <div className="stack">
            <label className="stack">
              Business Name
              <input className="input" placeholder="Your SME" />
            </label>
            <label className="stack">
              Industry
              <input className="input" placeholder="Services" />
            </label>
            <label className="stack">
              Language Preference
              <select className="select">
                <option>English</option>
                <option>Hindi</option>
                <option>Regional</option>
              </select>
            </label>
          </div>
          <div className="stack">
            <label className="stack">
              Role
              <input className="input" placeholder="Finance Manager" />
            </label>
            <label className="stack">
              Email
              <input className="input" placeholder="name@company.com" />
            </label>
            <button className="primary-btn">Save Settings</button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
