import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { apiPost } from "../lib/api.js";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function Topbar() {
  const { user, logout, token } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const initials = user?.name?.trim()?.[0]?.toUpperCase() || "U";

  const connectRazorpay = async () => {
    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }
    try {
      const order = await apiPost(
        "/api/payments/order",
        { amount: 10000, currency: "INR" },
        token
      );
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Financial Health Assessment Tool",
        description: "Connect Razorpay",
        order_id: order.order_id,
        handler: function () {
          alert("Payment authorized. Connection complete.");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || ""
        },
        theme: {
          color: "#39d0a8"
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message || "Unable to connect Razorpay.");
    }
  };

  return (
    <header className="topbar">
      <div>
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </div>
      <div className="topbar-actions">
        <select
          className="select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
        <button className="ghost-btn" onClick={connectRazorpay}>
          {t("connectRazorpay")}
        </button>
        <div className="profile-wrap">
          <button className="profile-btn" onClick={() => setOpen((prev) => !prev)}>
            <span className="avatar">{initials}</span>
            <span className="profile-name">{user?.name || "SME Admin"}</span>
          </button>
          {open ? (
            <div className="profile-menu">
              <div className="profile-title">{user?.name || "SME Admin"}</div>
              <div className="profile-detail">{user?.email || "email@company.com"}</div>
              <div className="profile-detail">{user?.role || "User"}</div>
              <button className="ghost-btn" onClick={logout}>
                {t("logout")}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
