import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const C = {
  white:  "#FAFAF8",
  navy:   "#070B16",
  accent: "#F8D00F",
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{
      fontFamily: "'Sora', sans-serif",
      background: C.navy,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${C.white}0a 1px, transparent 1px), linear-gradient(90deg, ${C.white}0a 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", maxWidth: 480 }}>
        <img
          src="/logo-voltaic.svg"
          alt="Voltaic"
          style={{ width: 120, height: 48, objectFit: "contain", filter: "brightness(0) invert(1)", display: "block", margin: "0 auto 48px" }}
        />

        <p style={{
          fontFamily: "'Encode Sans Expanded', sans-serif",
          fontSize: 96, fontWeight: 800, lineHeight: 1,
          background: "linear-gradient(90deg, #fff1a9 0%, #F8D00F 60%, #fff1a9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 16,
        }}>
          404
        </p>

        <h1 style={{
          fontFamily: "'Encode Sans Expanded', sans-serif",
          fontSize: 22, fontWeight: 800, color: C.white, marginBottom: 12,
        }}>
          Página não encontrada
        </h1>

        <p style={{
          fontSize: 15, fontWeight: 300, color: C.white, opacity: 0.45,
          lineHeight: 1.7, marginBottom: 40,
        }}>
          O endereço que você tentou acessar não existe.<br />
          Verifique o link ou volte para a página inicial.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            background: C.accent, color: "#111827",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", textDecoration: "none",
            padding: "14px 32px", borderRadius: 4,
          }}
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
