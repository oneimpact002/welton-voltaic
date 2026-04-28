const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-5">
          <a href="#" className="text-xl font-bold tracking-tight">
            Lorem
          </a>
          <ul className="flex items-center gap-6 text-sm">
            <li><a href="#" className="hover:underline underline-offset-4">Início</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">Sobre</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Placeholder
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Começar agora
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-foreground text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                Saiba mais
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-border">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="text-3xl font-bold mb-3">0{i}</div>
                <h3 className="text-lg font-semibold mb-2">Lorem ipsum</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© 2026 Lorem. Todos os direitos reservados.</p>
          <p>Feito com placeholder.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
