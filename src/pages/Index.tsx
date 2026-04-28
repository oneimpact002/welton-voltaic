import { useState, useEffect, useRef } from "react";
import { scrollTo } from "@/lib/scrollTo";
import {
  ChevronDown, ChevronUp, ArrowRight,
  MessageCircle, Mail, XCircle,
  Building2, Zap, TrendingDown, Clock,
} from "lucide-react";
import WordReveal from "@/components/WordReveal";
import ShimmerButton from "@/components/ShimmerButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import CounterUp from "@/components/CounterUp";
import { useMobileLayout } from "@/hooks/use-mobile-layout";

const C = {
  white:       "#FAFAF8",
  offwhite:    "#F4F3EF",
  black:       "#111827",
  navy:        "#070B16",
  navyMid:     "#0f1a2e",
  accent:      "#F8D00F",
  accentLight: "#FDE96A",
  accentMuted: "#FEFBE8",
};

const DARK_SLOTS   = new Set([0, 1, 2, 3, 4, 5, 6, 9]);
const ORANGE_SLOTS = new Set([7]);

const bg  = (s: number) => ORANGE_SLOTS.has(s) ? C.accent : DARK_SLOTS.has(s) ? C.navy : s === 3 ? C.offwhite : s === 5 ? C.accentMuted : C.white;
const fg  = (s: number) => DARK_SLOTS.has(s) || ORANGE_SLOTS.has(s) ? C.white : C.black;
const hi  = (s: number) => DARK_SLOTS.has(s) || ORANGE_SLOTS.has(s) ? C.accentLight : C.accent;
const bdr = (s: number) => DARK_SLOTS.has(s) || ORANGE_SLOTS.has(s) ? `${C.white}18` : `${C.black}12`;

function SectionBadge({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <div
      className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:flex"
      style={{ opacity: 0.14, flexDirection: "column", alignItems: "center", gap: 8 }}
    >
      <span style={{
        fontSize: 9, fontWeight: 600, fontFamily: "monospace",
        color: light ? C.white : C.black,
        writingMode: "vertical-rl", transform: "rotate(180deg)",
        letterSpacing: "0.18em", textTransform: "uppercase",
      }}>
        {n} · {label}
      </span>
    </div>
  );
}

const faqs = [
  {
    q: "Isso realmente vai reduzir minha conta de energia?",
    a: "Sim. Um sistema bem dimensionado para o seu consumo pode reduzir a fatura de eletricidade em até 95%. Antes de qualquer proposta, fazemos uma análise técnica do seu consumo real para garantir que o retorno seja previsível e comprovado.",
  },
  {
    q: "Em quanto tempo recupero o investimento?",
    a: "Para empresas industriais, o prazo médio de retorno é de 3 a 5 anos. Após esse período, a energia gerada pelos painéis é essencialmente gratuita pelos próximos 20+ anos. Apresentamos o retorno financeiro detalhado antes de qualquer decisão.",
  },
  {
    q: "Vale mesmo a pena instalar painéis solares na minha empresa?",
    a: "Depende do seu consumo e perfil de operação — é exatamente por isso que fazemos uma análise antes de qualquer proposta. Para indústrias com alto consumo energético, a energia solar costuma ser uma das decisões financeiras mais inteligentes do negócio.",
  },
  {
    q: "Quanto custa uma instalação?",
    a: "O custo varia conforme o porte do sistema necessário para o seu consumo. Para ter um número real, precisamos analisar sua demanda atual. Entre em contato para uma análise técnica gratuita — sem compromisso.",
  },
  {
    q: "Como funciona o processo de instalação?",
    a: "Cuidamos de tudo: visita técnica, projeto, instalação e homologação junto à distribuidora. Você não precisa se preocupar com burocracia. Do início ao fim, acompanhamos cada etapa com prazo e responsabilidade.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.black}15` }}>
          <button
            className="w-full flex items-center justify-between py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: C.black, lineHeight: 1.4 }} className="pr-4">
              {item.q}
            </span>
            {open === i
              ? <ChevronUp size={15} style={{ color: C.accent, flexShrink: 0 }} />
              : <ChevronDown size={15} style={{ color: C.black, opacity: 0.3, flexShrink: 0 }} />}
          </button>
          {open === i && (
            <p style={{ fontSize: 15, fontWeight: 300, color: C.black, opacity: 0.55, lineHeight: 1.7, paddingBottom: 20 }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const Index = () => {
  const inner = "max-w-[1140px] mx-auto px-6";
  const { isMobile } = useMobileLayout();

  const [navOnHero, setNavOnHero] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavOnHero(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navBg = navOnHero ? C.navy : C.white;
  const navFg = navOnHero ? C.white : C.black;

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: C.white, color: C.black }}>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 px-6"
        style={{
          background: navBg,
          borderBottom: !navOnHero ? `1px solid ${C.black}12` : "none",
          boxShadow: !navOnHero ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
          zIndex: 9999,
        }}
      >
        <div className={`${inner} flex items-center justify-between py-4`}>
          <img
            src="/logo-voltaic.svg"
            alt="Voltaic"
            style={{
              height: 36,
              filter: navOnHero ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.4s ease",
            }}
          />

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Início",        id: "inicio"        },
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Diferenciais",  id: "diferenciais"  },
              { label: "Sobre",         id: "sobre"         },
              { label: "FAQ",           id: "faq"           },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                style={{
                  fontSize: 12, color: navFg, opacity: 0.5,
                  textDecoration: "none", cursor: "pointer",
                  transition: "opacity 0.2s, color 0.4s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                {label}
              </a>
            ))}
          </div>

          <ShimmerButton
            style={{ background: C.accent, color: C.black }}
            onClick={() => scrollTo("contato")}
          >
            SOLICITAR ANÁLISE
          </ShimmerButton>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        id="inicio"
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, #0d1525 100%)`,
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SectionBadge n="01" label="Hero" light />

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${C.white}06 1px, transparent 1px), linear-gradient(90deg, ${C.white}06 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="absolute pointer-events-none" style={{
          right: "10%", top: "20%", width: 480, height: 480, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`,
        }} />

        <div className={`${inner} relative w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24`}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid ${C.accent}40`, borderRadius: 4,
              padding: "5px 12px", marginBottom: 36,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.accent, flexShrink: 0 }} />
              <span style={{ fontSize: 10, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", fontWeight: 700 }}>
                Energia Solar Industrial
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Encode Sans Expanded', sans-serif",
              fontSize: isMobile ? 28 : 42, fontWeight: 800, lineHeight: 1.1,
              color: C.white, marginBottom: 28,
            }}>
              <WordReveal text="Aumente as suas" style={{ color: C.white, display: "block" }} delay={0.1} />
              <WordReveal text="horas de Sol." style={{ color: C.accentLight, display: "block" }} delay={0.28} />
              <WordReveal text="Reduza a sua fatura de eletricidade." style={{ color: C.white, display: "block" }} delay={0.45} />
            </h1>

            <p style={{
              fontSize: 17, fontWeight: 300, color: C.white, opacity: 0.5,
              lineHeight: 1.75, marginBottom: 48, maxWidth: 480,
            }}>
              Instalamos sistemas solares para indústrias com alto consumo energético — projeto técnico, homologação e acompanhamento do início ao fim.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <ShimmerButton
                style={{ fontSize: 12, padding: "15px 30px", background: C.accent, color: C.black }}
                onClick={() => scrollTo("contato")}
              >
                SOLICITAR ANÁLISE GRATUITA
              </ShimmerButton>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div style={{
              aspectRatio: "4/5", borderRadius: 8,
              backgroundColor: C.navyMid,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${C.white}08`,
            }}>
              <div style={{ textAlign: "center" }}>
                <Zap size={48} style={{ color: `${C.accent}50`, marginBottom: 12 }} />
                <span style={{ color: `${C.white}20`, fontSize: 12 }}>Foto do projeto</span>
              </div>
            </div>

            <div style={{
              position: "absolute", left: -32, bottom: 56,
              backgroundColor: C.white, padding: "18px 22px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)", borderRadius: 8,
            }}>
              <CounterUp
                to={95} prefix="" suffix="%"
                style={{ fontSize: 32, fontWeight: 800, color: C.black, lineHeight: 1, display: "block" }}
              />
              <p style={{ fontSize: 11, color: C.black, opacity: 0.4, marginTop: 5 }}>de redução na fatura</p>
            </div>

            <div style={{
              position: "absolute", top: 0, right: -6,
              width: 3, height: "55%", backgroundColor: C.accent, borderRadius: 4,
            }} />
          </div>
        </div>
      </section>

      {/* ── FAIXA NÚMEROS ── */}
      <section style={{ background: bg(1), padding: "56px 24px" }}>
        <SectionBadge n="02" label="Números" light />
        <RevealOnScroll>
          <div className={inner}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0" style={{
              borderTop: `1px solid ${C.white}14`,
              borderLeft: `1px solid ${C.white}14`,
            }}>
              {[
                { to: 95,  prefix: "até ", suffix: "%",     label: "De redução na fatura"    },
                { to: 5,   prefix: "",     suffix: " anos",  label: "Prazo médio de retorno"  },
                { to: 25,  prefix: "",     suffix: " anos",  label: "Vida útil dos painéis"   },
                { to: 100, prefix: "",     suffix: "%",      label: "Do processo acompanhado" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "40px 32px",
                  borderBottom: `1px solid ${C.white}14`,
                  borderRight: `1px solid ${C.white}14`,
                }}>
                  <CounterUp
                    to={item.to} prefix={item.prefix} suffix={item.suffix}
                    style={{ fontSize: 36, fontWeight: 800, color: C.accentLight, lineHeight: 1, display: "block" }}
                  />
                  <p style={{ fontSize: 12, color: C.white, opacity: 0.35, marginTop: 10, letterSpacing: "0.05em" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="relative" style={{ background: bg(2), padding: "112px 24px" }}>
        <SectionBadge n="03" label="Problema" light />
        <div className={`${inner} grid grid-cols-1 lg:grid-cols-2 gap-20 items-center`}>
          <RevealOnScroll delay={0}>
            <div style={{
              aspectRatio: "4/5", borderRadius: 8,
              backgroundColor: C.navyMid,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${C.white}08`,
            }}>
              <span style={{ color: `${C.white}20`, fontSize: 13 }}>Foto</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: hi(2), textTransform: "uppercase", marginBottom: 15 }}>
                O problema
              </p>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: isMobile ? 26 : 38, fontWeight: 800, color: fg(2), lineHeight: 1.15, marginBottom: 15,
              }}>
                <WordReveal text="Energia cara está consumindo o lucro da sua empresa." style={{ color: fg(2) }} />
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(2), opacity: 0.5, lineHeight: 1.7, marginBottom: 40 }}>
                Para indústrias com máquinas de grande potência, a conta de eletricidade é uma das maiores despesas fixas — e ela sobe todo ano, sem que você possa fazer nada.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Conta de energia que cresce a cada reajuste tarifário",
                  "Gasto que poderia estar financiando o crescimento do negócio",
                  "Dependência total da distribuidora e das bandeiras tarifárias",
                  "Custo imprevisível que impede o planejamento financeiro",
                  "Dinheiro saindo todo mês sem nenhum retorno",
                ].map((text, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <XCircle size={18} style={{ color: `${C.accent}80`, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 16, fontWeight: 300, color: fg(2), opacity: 0.65, lineHeight: 1.5 }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="relative" style={{ background: bg(3), padding: "112px 24px" }}>
        <SectionBadge n="04" label="Como Funciona" light />
        <div className={inner}>
          <RevealOnScroll>
            <div style={{ marginBottom: 64, maxWidth: 560 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: hi(3), textTransform: "uppercase", marginBottom: 16 }}>
                O processo
              </p>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: isMobile ? 26 : 38, fontWeight: 800, color: fg(3), lineHeight: 1.15,
              }}>
                <WordReveal text="Do diagnóstico à energia funcionando" style={{ color: fg(3) }} />
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 relative">
            <div className="hidden lg:block absolute" style={{
              top: 22, left: "12.5%", right: "12.5%", height: 1,
              background: `linear-gradient(to right, transparent, ${C.accent}40, ${C.accent}40, transparent)`,
            }} />

            {[
              { n: "01", title: "Análise técnica",      desc: "Avaliamos o consumo real da sua empresa e o potencial de geração antes de qualquer proposta." },
              { n: "02", title: "Proposta com retorno",  desc: "Dimensionamos o sistema ideal e apresentamos o retorno financeiro detalhado — sem promessa vaga." },
              { n: "03", title: "Instalação",            desc: "Nossa equipe realiza a instalação com segurança e compromisso de prazo — sem terceirizar." },
              { n: "04", title: "Homologação e uso",     desc: "Cuidamos de toda a burocracia com a distribuidora. Você só liga o sistema e começa a economizar." },
            ].map((s, i) => (
              <RevealOnScroll key={i} delay={i * 0.12}>
                <div style={{ padding: "0 20px 0 0", position: "relative" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: `1px solid ${C.accent}50`,
                    backgroundColor: C.navyMid,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 28, position: "relative", zIndex: 1,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.accent, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                      {s.n}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: fg(3), marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, color: fg(3), opacity: 0.45, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section id="diferenciais" className="relative" style={{ background: bg(4), padding: "112px 24px" }}>
        <SectionBadge n="05" label="Diferenciais" light />
        <div className={inner}>
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-end" style={{ marginBottom: 56 }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", color: hi(4), textTransform: "uppercase", marginBottom: 15 }}>
                  Por que a Voltaic
                </p>
                <h2 style={{
                  fontFamily: "'Encode Sans Expanded', sans-serif",
                  fontSize: isMobile ? 26 : 38, fontWeight: 800, color: fg(4), lineHeight: 1.15,
                }}>
                  <WordReveal text="Segurança no investimento, clareza no retorno" style={{ color: fg(4) }} />
                </h2>
              </div>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(4), opacity: 0.5, lineHeight: 1.7 }}>
                Não vendemos energia solar. Entregamos uma decisão financeira segura — com projeto bem dimensionado, prazo cumprido e acompanhamento real.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                icon: <Building2 size={22} />,
                title: "Foco em Industrial",
                desc: "Especialistas em sistemas de grande porte para empresas com alto consumo energético — sem adaptar solução residencial para indústria.",
                highlight: true,
              },
              {
                icon: <TrendingDown size={22} />,
                title: "Retorno comprovado antes de decidir",
                desc: "Apresentamos o retorno financeiro detalhado antes de qualquer contratação. Você decide com números reais na mão.",
                highlight: false,
              },
              {
                icon: <Clock size={22} />,
                title: "Processo do início ao fim",
                desc: "Projeto técnico, instalação, homologação e pós-venda — tudo com equipe própria, sem terceirizar nenhuma etapa.",
                highlight: false,
              },
              {
                icon: <Zap size={22} />,
                title: "Compromisso com prazos",
                desc: "Cada etapa tem prazo definido e acompanhamento direto. Sem surpresas, sem atrasos sem justificativa.",
                highlight: false,
              },
            ].map((s, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="card-hover" style={{
                  padding: 32, height: "100%", borderRadius: 10,
                  border: `1px solid ${bdr(4)}`,
                  backgroundColor: C.white,
                  cursor: "default",
                }}>
                  <div style={{ marginBottom: 20, color: C.accent }}>{s.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.black, marginBottom: 12 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.black, opacity: 0.5 }}>
                    {s.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACTO ── */}
      <section className="relative" style={{ background: bg(5), padding: "112px 24px" }}>
        <SectionBadge n="06" label="Impacto" light />
        <div className={inner}>
          <RevealOnScroll>
            <div style={{ marginBottom: 64, maxWidth: 640 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: 16 }}>
                O que muda na prática
              </p>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: isMobile ? 26 : 38, fontWeight: 800, color: fg(5), lineHeight: 1.15,
              }}>
                <WordReveal text="Energia deixa de ser custo. Passa a ser investimento." style={{ color: fg(5) }} />
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0" style={{
            borderTop: `1px solid ${C.accent}25`,
            borderLeft: `1px solid ${C.accent}25`,
          }}>
            {[
              { icon: <TrendingDown size={28} />, value: "até 95%",    label: "Redução na fatura",          desc: "A maioria das empresas chega próxima a zero no gasto com eletricidade." },
              { icon: <Clock size={28} />,        value: "3 a 5 anos", label: "Retorno do investimento",    desc: "Após o payback, energia essencialmente gratuita por mais de 20 anos." },
              { icon: <Zap size={28} />,          value: "previsível", label: "Custo de energia",           desc: "Sai da imprevisibilidade da rede elétrica para um custo controlado." },
              { icon: <Building2 size={28} />,    value: "25 anos",    label: "Vida útil dos painéis",      desc: "Com garantia de performance pelo fabricante durante toda a vida útil." },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div style={{
                  padding: "40px 32px",
                  borderBottom: `1px solid ${C.accent}25`,
                  borderRight: `1px solid ${C.accent}25`,
                }}>
                  <div style={{ color: C.accent, marginBottom: 20 }}>{item.icon}</div>
                  <p style={{ fontSize: 28, fontWeight: 800, color: fg(5), lineHeight: 1, marginBottom: 8, fontFamily: "'Encode Sans Expanded', sans-serif" }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: fg(5), marginBottom: 8 }}>{item.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 300, color: fg(5), opacity: 0.45, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="relative" style={{ background: bg(6), padding: "112px 24px" }}>
        <SectionBadge n="07" label="Sobre" light />
        <div className={`${inner} grid grid-cols-1 lg:grid-cols-2 gap-20 items-center`}>
          <RevealOnScroll delay={0}>
            <div style={{
              aspectRatio: "1/1", borderRadius: 8,
              backgroundColor: C.navyMid,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${C.white}08`,
            }}>
              <div style={{ textAlign: "center" }}>
                <Zap size={48} style={{ color: `${C.accentLight}40`, marginBottom: 12 }} />
                <span style={{ color: `${C.white}20`, fontSize: 12 }}>Foto</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: hi(6), textTransform: "uppercase", marginBottom: 15 }}>
                Sobre a Voltaic
              </p>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: isMobile ? 26 : 38, fontWeight: 800, color: fg(6), lineHeight: 1.15, marginBottom: 24,
              }}>
                <WordReveal text="Especialistas em energia solar para indústria" style={{ color: fg(6) }} />
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(6), opacity: 0.5, lineHeight: 1.75, marginBottom: 16 }}>
                A Voltaic nasceu com um objetivo claro: ser a empresa que entrega energia solar industrial com critério técnico, segurança no investimento e comprometimento real com o resultado do cliente.
              </p>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(6), opacity: 0.5, lineHeight: 1.75, marginBottom: 16 }}>
                Não terceirizamos instalação nem suporte técnico. Cada projeto é acompanhado de perto — do dimensionamento até a homologação final.
              </p>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(6), opacity: 0.5, lineHeight: 1.75, marginBottom: 48 }}>
                Trabalhamos com equipamentos de primeira linha, projeto bem dimensionado e prazos que são cumpridos. Sem promessa de resultado que não conseguimos provar antes.
              </p>

              <div className="grid grid-cols-3 gap-6" style={{ paddingTop: 32, borderTop: `1px solid ${bdr(6)}` }}>
                {["Análise técnica gratuita", "Processo 100% acompanhado", "Retorno comprovado antes"].map((label, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.accentLight, flexShrink: 0, marginTop: 4 }} />
                    <p style={{ fontSize: 13, color: fg(6), opacity: 0.5, lineHeight: 1.5 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative" style={{ backgroundColor: C.accent, padding: "100px 24px", overflow: "hidden" }}>
        <SectionBadge n="08" label="CTA" light />

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${C.white}08 1px, transparent 1px), linear-gradient(90deg, ${C.white}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <RevealOnScroll>
          <div className={`${inner} text-center relative`} style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#fff", opacity: 0.65, textTransform: "uppercase", marginBottom: 20 }}>
              Próximo passo
            </p>
            <h2 style={{
              fontFamily: "'Encode Sans Expanded', sans-serif",
              fontSize: isMobile ? 28 : 40, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20,
            }}>
              <WordReveal text="Chega de pagar pelo que o sol já dá de graça." style={{ color: "#fff" }} />
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, color: "#fff", opacity: 0.7, lineHeight: 1.7, marginBottom: 48 }}>
              Solicite uma análise técnica gratuita. Avaliamos o consumo da sua empresa e apresentamos o retorno financeiro real — sem compromisso de contratação.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <ShimmerButton
                style={{ fontSize: 12, padding: "15px 30px", background: C.navy, color: "#fff" }}
                onClick={() => scrollTo("contato")}
              >
                SOLICITAR ANÁLISE GRATUITA
              </ShimmerButton>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative" style={{ background: bg(8), padding: "112px 24px" }}>
        <SectionBadge n="09" label="FAQ" />
        <div className={`${inner} grid grid-cols-1 lg:grid-cols-2 gap-20`}>
          <RevealOnScroll delay={0}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: hi(8), textTransform: "uppercase", marginBottom: 15 }}>
                Dúvidas
              </p>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: isMobile ? 26 : 36, fontWeight: 800, color: fg(8), lineHeight: 1.2, marginBottom: 15,
              }}>
                <WordReveal text="Perguntas que todo empresário faz antes de decidir." style={{ color: fg(8) }} />
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: fg(8), opacity: 0.45, lineHeight: 1.7, marginBottom: 40 }}>
                Se ainda tiver dúvidas, entre em contato diretamente. Respondemos todas.
              </p>

              <div id="contato" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: <MessageCircle size={18} />, title: "Atendimento por WhatsApp", sub: "Clique aqui para tirar suas dúvidas" },
                  { icon: <Mail size={18} />,          title: "Atendimento por E-mail",   sub: "info@originalvoltaic.com"          },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={i === 1 ? "mailto:info@originalvoltaic.com" : "#"}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      border: `1px solid ${bdr(8)}`, padding: "16px 20px",
                      textDecoration: "none", transition: "border-color 0.2s", borderRadius: 8,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = bdr(8))}
                  >
                    <span style={{ color: C.accent, flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: fg(8) }}>{c.title}</p>
                      <p style={{ fontSize: 13, color: fg(8), opacity: 0.4, marginTop: 3 }}>{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div style={{ paddingTop: 4 }}>
              <FAQAccordion />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── RODAPÉ ── */}
      <footer style={{ background: bg(9), padding: "64px 24px 32px" }}>
        <div className={inner}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10" style={{ marginBottom: 48 }}>
            <div className="lg:col-span-2">
              <div style={{ marginBottom: 16 }}>
                <img
                  src="/logo-voltaic.svg"
                  alt="Voltaic"
                  style={{ height: 32, filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p style={{ fontSize: 14, color: C.white, opacity: 0.28, lineHeight: 1.7, maxWidth: 300 }}>
                Energia solar industrial com critério técnico, segurança no investimento e retorno comprovado.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.white, opacity: 0.22, marginBottom: 16 }}>
                Navegação
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Início", "Como Funciona", "Diferenciais", "Sobre", "FAQ"].map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 14, color: C.white, opacity: 0.35, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.35")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.white, opacity: 0.22, marginBottom: 16 }}>
                Contato
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["info@originalvoltaic.com", "WhatsApp"].map((l) => (
                  <li key={l}>
                    <a href={l.includes("@") ? `mailto:${l}` : "#"}
                      style={{ fontSize: 14, color: C.white, opacity: 0.35, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.35")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: `1px solid ${C.white}10`, paddingTop: 24,
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <p style={{ fontSize: 12, color: C.white, opacity: 0.18 }}>© 2026 Voltaic. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
