import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview" },
  { to: "/stress", label: "Stress Simulator" },
  { to: "/fraud", label: "Fraud & Leakage" },
  { to: "/forecast", label: "Forecasting" },
  { to: "/compliance", label: "Compliance" },
  { to: "/reports", label: "Investor Reports" },
  { to: "/settings", label: "Settings" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">FH</span>
        <div>
          <div className="brand-title">Finance Health</div>
          <div className="brand-sub">Assessment Tool</div>
        </div>
      </div>
      <nav className="nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="pill">Secured - AES-256</div>
        <div className="pill">Multi-Lingual</div>
      </div>
    </aside>
  );
}
