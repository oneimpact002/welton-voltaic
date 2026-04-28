import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
  variant?: "light" | "dark";
}

const ACCENT = "#F8D00F";

export default function ShimmerButton({ children, style, variant = "light", ...rest }: Props) {
  const base: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    padding: "10px 20px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    background: variant === "dark" ? "#F8F8F8" : ACCENT,
    color: variant === "dark" ? ACCENT : "#111827",
    transition: "opacity 0.2s",
    fontFamily: "inherit",
    ...style,
  };

  return (
    <button style={base} {...rest}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span className="shimmer-overlay" />
    </button>
  );
}
