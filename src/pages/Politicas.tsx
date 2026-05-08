const C = {
  white:  "#FAFAF8",
  navy:   "#070B16",
  accent: "#F8D00F",
  black:  "#111827",
  bg:     "#FFFFFF",
  text:   "#111827",
  muted:  "#6B7280",
  border: "#E5E7EB",
};

const p  = (text: string) => (
  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 12 }}>{text}</p>
);

const ul = (items: string[]) => (
  <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 4 }}>{item}</li>
    ))}
  </ul>
);

const kv = (pairs: [string, string][]) => (
  <div style={{ marginBottom: 12 }}>
    {pairs.map(([k, v], i) => (
      <p key={i} style={{ fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
        <strong style={{ color: C.text, fontWeight: 600 }}>{k}:</strong> {v}
      </p>
    ))}
  </div>
);

const sections = [
  {
    title: "1. Identificação do Responsável pelo Tratamento",
    content: (
      <>
        {kv([
          ["Empresa", "Original Voltaic, Unipessoal Lda"],
          ["NIF", "519349539"],
          ["E-mail de contacto", "info@originalvoltaic.com"],
          ["Localização", "Coimbra, 3020-275, Portugal"],
          ["Website", "https://originalvoltaic.com/"],
        ])}
        {p("Para qualquer questão relacionada com privacidade e proteção de dados, o utilizador poderá contactar-nos através do endereço de e-mail indicado acima.")}
      </>
    ),
  },
  {
    title: "2. Dados Pessoais Recolhidos",
    content: (
      <>
        {p("Através do website, poderemos recolher as seguintes categorias de dados pessoais:")}
        {ul(["Nome", "Endereço de e-mail", "Número de telefone", "Endereço IP", "Dados de navegação", "Informações fornecidas através de formulários de contacto", "Dados técnicos do dispositivo e navegador", "Cookies e tecnologias semelhantes"])}
        {p("A recolha dos dados poderá ocorrer quando:")}
        {ul(["O utilizador preenche formulários no website", "O utilizador entra em contacto por e-mail", "O utilizador navega no website", "O utilizador aceita cookies", "O utilizador utiliza funcionalidades ou serviços disponibilizados no website"])}
      </>
    ),
  },
  {
    title: "3. Finalidade do Tratamento dos Dados",
    content: (
      <>
        {p("Os dados pessoais recolhidos poderão ser utilizados para as seguintes finalidades:")}
        {ul(["Responder a pedidos de contacto e suporte", "Fornecer informações sobre serviços ou produtos", "Melhorar a experiência de navegação e utilização do website", "Garantir a segurança e funcionamento do website", "Cumprir obrigações legais e regulamentares", "Realizar análises estatísticas e de desempenho", "Prevenir fraudes e acessos não autorizados"])}
        {p("A Original Voltaic apenas recolhe os dados estritamente necessários para cada finalidade específica.")}
      </>
    ),
  },
  {
    title: "4. Fundamento Jurídico do Tratamento",
    content: (
      <>
        {p("O tratamento dos dados pessoais baseia-se nas seguintes bases legais previstas no RGPD:")}
        {ul(["Consentimento do titular dos dados", "Execução de contrato ou diligências pré-contratuais", "Cumprimento de obrigações legais", "Interesse legítimo da empresa, nomeadamente para segurança, melhoria dos serviços e comunicação com utilizadores"])}
        {p("Quando o tratamento se basear no consentimento, o utilizador poderá retirá-lo a qualquer momento.")}
      </>
    ),
  },
  {
    title: "5. Partilha de Dados com Terceiros",
    content: (
      <>
        {p("Os dados pessoais poderão ser partilhados com prestadores de serviços externos quando necessário para o funcionamento do website ou prestação dos serviços, incluindo:")}
        {ul(["Serviços de alojamento e infraestrutura", "Ferramentas de análise e desempenho", "Plataformas de comunicação e e-mail", "Prestadores de suporte técnico", "Entidades legais ou regulatórias quando exigido por lei"])}
        {p("A Original Voltaic assegura que todos os terceiros envolvidos cumprem requisitos adequados de proteção de dados.")}
      </>
    ),
  },
  {
    title: "6. Cookies e Tecnologias Semelhantes",
    content: (
      <>
        {p("O website poderá utilizar cookies para:")}
        {ul(["Garantir o funcionamento adequado do website", "Melhorar a experiência do utilizador", "Analisar tráfego e desempenho", "Memorizar preferências", "Reforçar segurança"])}
        {p("Os cookies poderão incluir cookies essenciais, analíticos, de desempenho e de terceiros.")}
        {p("O utilizador poderá configurar o navegador para bloquear ou eliminar cookies, embora determinadas funcionalidades do website possam deixar de funcionar corretamente.")}
      </>
    ),
  },
  {
    title: "7. Conservação dos Dados",
    content: (
      <>
        {p("Os dados pessoais serão conservados apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos ou conforme exigido por lei.")}
        {p("Após o período de conservação aplicável, os dados serão eliminados ou anonimizados de forma segura.")}
      </>
    ),
  },
  {
    title: "8. Direitos dos Titulares dos Dados",
    content: (
      <>
        {p("Nos termos da legislação aplicável, o utilizador poderá exercer os seguintes direitos:")}
        {ul(["Direito de acesso", "Direito de retificação", "Direito de apagamento", "Direito de limitação do tratamento", "Direito de oposição", "Direito à portabilidade dos dados", "Direito de retirar o consentimento", "Direito de apresentar reclamação junto da autoridade de controlo"])}
        {p("Em Portugal, a autoridade de controlo competente é a Comissão Nacional de Proteção de Dados (CNPD).")}
        {p("Os pedidos relacionados com proteção de dados poderão ser enviados para: info@originalvoltaic.com")}
      </>
    ),
  },
  {
    title: "9. Segurança dos Dados",
    content: (
      <>
        {p("A Original Voltaic adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra:")}
        {ul(["Acesso não autorizado", "Divulgação indevida", "Perda", "Alteração", "Destruição"])}
        {p("Apesar dos esforços de segurança implementados, nenhum sistema é totalmente imune a riscos.")}
      </>
    ),
  },
  {
    title: "10. Transferências Internacionais de Dados",
    content: (
      <>
        {p("Alguns fornecedores ou serviços utilizados no website poderão processar dados fora do Espaço Económico Europeu.")}
        {p("Sempre que ocorrer transferência internacional de dados, a Original Voltaic procurará assegurar mecanismos adequados de proteção em conformidade com o RGPD.")}
      </>
    ),
  },
  {
    title: "11. Ligações para Websites Externos",
    content: (
      <>
        {p("O website poderá conter ligações para websites de terceiros. A Original Voltaic não é responsável pelas práticas de privacidade ou conteúdos desses websites externos.")}
        {p("Recomenda-se que o utilizador consulte as respetivas políticas de privacidade.")}
      </>
    ),
  },
  {
    title: "12. Alterações à Política de Privacidade",
    content: (
      <>
        {p("A Original Voltaic poderá atualizar esta Política de Privacidade periodicamente.")}
        {p("Quaisquer alterações relevantes serão publicadas nesta página, acompanhadas da respetiva data de atualização.")}
      </>
    ),
  },
  {
    title: "13. Contacto",
    content: (
      <>
        {p("Para qualquer questão relacionada com esta Política de Privacidade ou com o tratamento dos seus dados pessoais, contacte:")}
        {kv([
          ["Empresa", "Original Voltaic, Unipessoal Lda"],
          ["NIF", "519349539"],
          ["E-mail", "info@originalvoltaic.com"],
          ["Localização", "Coimbra, 3020-275, Portugal"],
          ["Website", "https://originalvoltaic.com/"],
        ])}
      </>
    ),
  },
];

export default function Politicas() {
  return (
    <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: C.bg, color: C.text, minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/">
            <img
              src="/logo-voltaic.svg"
              alt="Voltaic"
              style={{ width: 110, height: 44, objectFit: "contain" }}
            />
          </a>
          <a
            href="/"
            style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            ← Voltar ao site
          </a>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: C.navy, textTransform: "uppercase", marginBottom: 16, opacity: 0.4 }}>
          Documento legal
        </p>
        <h1 style={{
          fontFamily: "'Encode Sans Expanded', sans-serif",
          fontSize: 32, fontWeight: 800, color: C.text, lineHeight: 1.2, marginBottom: 12,
        }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>
          Última atualização: 08 de maio de 2026
        </p>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 56 }}>
          A presente Política de Privacidade descreve como a Original Voltaic, Unipessoal Lda recolhe, utiliza, armazena e protege os dados pessoais dos utilizadores do website https://originalvoltaic.com/. A Original Voltaic compromete-se a tratar os dados pessoais em conformidade com o RGPD (Regulamento UE 2016/679), a Lei n.º 58/2019 de Portugal e demais legislação aplicável.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
              <h2 style={{
                fontFamily: "'Encode Sans Expanded', sans-serif",
                fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16,
              }}>
                {s.title}
              </h2>
              {s.content}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: C.muted }}>© 2026 Voltaic. Todos os direitos reservados.</p>
          <a href="/" style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >Página inicial</a>
        </div>
      </footer>

    </div>
  );
}
