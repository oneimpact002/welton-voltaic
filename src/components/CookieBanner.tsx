import { useState, useEffect } from "react";

const C = {
  navy:   "#070B16",
  white:  "#FAFAF8",
  accent: "#F8D00F",
  black:  "#111827",
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      zIndex: 99999, width: "calc(100% - 48px)", maxWidth: 640,
      backgroundColor: C.navy,
      border: `1px solid ${C.white}15`,
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 20, flexWrap: "wrap",
      animation: "slideUp 0.35s ease",
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <p style={{ fontSize: 13, color: C.white, opacity: 0.65, lineHeight: 1.6, margin: 0, flex: 1, minWidth: 200 }}>
        Utilizamos cookies para melhorar a sua experiência no site.{" "}
        <span style={{ opacity: 0.45 }}>Ao continuar, aceita a nossa utilização de cookies.</span>
      </p>

      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          onClick={reject}
          style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            padding: "9px 18px", borderRadius: 6, border: `1px solid ${C.white}20`,
            background: "transparent", color: C.white, opacity: 0.5,
            cursor: "pointer", fontFamily: "inherit",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
        >
          Rejeitar
        </button>
        <button
          onClick={accept}
          style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            padding: "9px 20px", borderRadius: 6, border: "none",
            background: C.accent, color: C.black,
            cursor: "pointer", fontFamily: "inherit",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
