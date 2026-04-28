import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";

const C = {
  white:       "#FAFAF8",
  black:       "#111827",
  navy:        "#070B16",
  navyMid:     "#0f1a2e",
  accent:      "#F8D00F",
  accentLight: "#FDE96A",
};

const Input = ({
  label, name, type = "text", placeholder, required = true, value, onChange,
}: {
  label: string; name: string; type?: string; placeholder: string;
  required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: C.white, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: C.accent, marginLeft: 4 }}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      style={{
        background: "#0b101e",
        border: `1px solid ${C.white}15`,
        borderRadius: 8,
        padding: "14px 16px",
        fontSize: 15,
        color: C.white,
        outline: "none",
        fontFamily: "'Sora', sans-serif",
        transition: "border-color 0.2s",
      }}
      onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
      onBlur={e => (e.currentTarget.style.borderColor = `${C.white}15`)}
    />
  </div>
);

const Select = ({
  label, name, options, required = true, value, onChange,
}: {
  label: string; name: string; options: string[];
  required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: C.white, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: C.accent, marginLeft: 4 }}>*</span>}
    </label>
    <select
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      style={{
        background: "#0b101e",
        border: `1px solid ${C.white}15`,
        borderRadius: 8,
        padding: "14px 16px",
        fontSize: 15,
        color: value ? C.white : `${C.white}40`,
        outline: "none",
        fontFamily: "'Sora', sans-serif",
        transition: "border-color 0.2s",
        cursor: "pointer",
        appearance: "none",
      }}
      onFocus={e => (e.currentTarget.style.borderColor = C.accent)}
      onBlur={e => (e.currentTarget.style.borderColor = `${C.white}15`)}
    >
      <option value="" disabled>Selecione</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#0b101e" }}>{o}</option>)}
    </select>
  </div>
);

const Contato = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "", empresa: "", email: "", whatsapp: "", fatura: "", setor: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: C.navy, minHeight: "100vh", color: C.white }}>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 9999,
        background: C.navy,
        borderBottom: `1px solid ${C.white}08`,
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              color: C.white, opacity: 0.5, fontSize: 13,
              fontFamily: "'Sora', sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
          >
            <ArrowLeft size={15} />
            Voltar
          </button>

          <img
            src="/logo-voltaic.svg"
            alt="Voltaic"
            style={{ height: 32, filter: "brightness(0) invert(1)" }}
          />

          <div style={{ width: 80 }} />
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px 96px" }}>

        {!submitted ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: 56 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: `1px solid ${C.accent}40`, borderRadius: 4,
                padding: "5px 12px", marginBottom: 24,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", fontWeight: 700 }}>
                  Análise Gratuita
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: 34, fontWeight: 800, lineHeight: 1.15,
                color: C.white, marginBottom: 16,
              }}>
                Solicitar análise gratuita
              </h1>
              <p style={{ fontSize: 16, fontWeight: 300, color: C.white, opacity: 0.45, lineHeight: 1.75 }}>
                Preencha os dados abaixo. Entraremos em contato em até 24 horas com uma análise personalizada para a sua empresa.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              <Input label="Nome completo" name="nome" placeholder="Seu nome" value={form.nome} onChange={set("nome")} />
              <Input label="Empresa" name="empresa" placeholder="Nome da empresa" value={form.empresa} onChange={set("empresa")} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="E-mail" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} />
                <Input label="WhatsApp" name="whatsapp" type="tel" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={set("whatsapp")} />
              </div>

              <Select
                label="Setor de atuação"
                name="setor"
                options={["Indústria", "Comércio", "Agronegócio", "Outro"]}
                value={form.setor}
                onChange={set("setor")}
              />

              <Input
                label="Valor médio da fatura de energia (R$)"
                name="fatura"
                placeholder="Ex: R$ 15.000"
                value={form.fatura}
                onChange={set("fatura")}
                required={false}
              />

              {/* Separador */}
              <div style={{ borderTop: `1px solid ${C.white}10`, paddingTop: 8 }} />

              <ShimmerButton
                type="submit"
                style={{
                  background: C.accent, color: C.black,
                  fontSize: 13, padding: "16px 32px", width: "100%",
                  borderRadius: 8,
                }}
              >
                ENVIAR SOLICITAÇÃO
              </ShimmerButton>

              <p style={{ fontSize: 12, color: C.white, opacity: 0.25, textAlign: "center", lineHeight: 1.6 }}>
                Ao enviar, você concorda em receber contato da Voltaic sobre esta solicitação.
              </p>
            </form>
          </>
        ) : (
          /* Estado de sucesso */
          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              backgroundColor: `${C.accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 32px",
            }}>
              <CheckCircle size={36} style={{ color: C.accent }} />
            </div>
            <h2 style={{
              fontFamily: "'Encode Sans Expanded', sans-serif",
              fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 16,
            }}>
              Solicitação enviada!
            </h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: C.white, opacity: 0.45, lineHeight: 1.75, marginBottom: 48, maxWidth: 420, margin: "0 auto 48px" }}>
              Recebemos seus dados. Nossa equipe entrará em contato em até 24 horas para apresentar a análise da sua empresa.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none", border: `1px solid ${C.white}20`,
                borderRadius: 8, padding: "12px 28px",
                fontSize: 13, color: C.white, opacity: 0.6,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
            >
              ← Voltar ao site
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Contato;
