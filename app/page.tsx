export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-neutral-950/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm tracking-[0.25em] uppercase">Nestish</div>
          <nav className="flex gap-8 text-xs uppercase tracking-[0.2em]">
            <a className="hover:text-neutral-300" href="#refugios">Refúgios</a>
            <a className="hover:text-neutral-300" href="#manifesto">Manifesto</a>
            <a className="hover:text-neutral-300" href="#experiencia">Experiência</a>
            <a className="hover:text-neutral-300" href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[80vh]">
          <div className="absolute inset-0">
            {/* substituir por <video> quando tiveres o clip */}
            <img
              src="/palheiro-nestish-hero.jpg"
              alt="Refúgio Nestish"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto max-w-6xl px-6">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-300">
                Refúgios com alma
              </p>
              <h1 className="max-w-xl text-4xl font-light text-neutral-50">
                Lugares onde o tempo abranda.
              </h1>
              <p className="mt-4 max-w-md text-sm text-neutral-300">
                Curadoria de refúgios silenciosos, entre natureza, arquitetura honesta
                e tempo que se estende.
              </p>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section id="manifesto" className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Manifesto
              </p>
              <h2 className="mt-4 text-2xl font-light">
                Não vendemos noites.  
                Curamos tempo em lugares com verdade.
              </h2>
              <p className="mt-6 text-sm text-neutral-300">
                Nestish nasce da vontade de criar refúgios onde o luxo é silêncio,
                espaço e honestidade dos materiais. Poucos lugares, escolhidos com
                cuidado, para quem procura tempo em vez de agenda.
              </p>
            </div>
            <div className="h-64 overflow-hidden rounded-lg bg-neutral-900">
              <img
                src="/manifesto-nestish.jpg"
                alt="Atmosfera Nestish"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Propriedades */}
        <section id="refugios" className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  Refúgios
                </p>
                <h2 className="mt-4 text-2xl font-light">Poucos lugares. Os certos.</h2>
              </div>
              <p className="max-w-sm text-xs text-neutral-400">
                Cada refúgio é escolhido pela sua relação com o território, luz e silêncio.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {/* Card 1 */}
              <article className="flex flex-col">
                <div className="h-64 overflow-hidden rounded-lg bg-neutral-900">
                  <img
                    src="/refugio-madeira-1.jpg"
                    alt="Palheiro Santo da Serra"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Madeira, Portugal
                </div>
                <h3 className="mt-2 text-sm font-light">Palheiro Santo da Serra</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Pedra, verde profundo e horizonte aberto. Um refúgio para abrandar.
                </p>
              </article>

              {/* Card 2 */}
              <article className="flex flex-col">
                <div className="h-64 overflow-hidden rounded-lg bg-neutral-900">
                  <img
                    src="/refugio-madeira-2.jpg"
                    alt="Casa entre levadas"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Madeira, Portugal
                </div>
                <h3 className="mt-2 text-sm font-light">Casa entre levadas</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Silêncio, água e vegetação. Um lugar para caminhar devagar.
                </p>
              </article>

              {/* Card 3 */}
              <article className="flex flex-col">
                <div className="h-64 overflow-hidden rounded-lg bg-neutral-900">
                  <img
                    src="/refugio-madeira-3.jpg"
                    alt="Miradouro privado"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Madeira, Portugal
                </div>
                <h3 className="mt-2 text-sm font-light">Miradouro privado</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Horizonte longo, céu aberto e tempo sem pressa.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Experiência */}
        <section id="experiencia" className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Experiência
              </p>
              <h2 className="mt-4 text-2xl font-light">
                Luxo é tempo, silêncio e território.
              </h2>
              <p className="mt-6 text-sm text-neutral-300">
                A experiência Nestish não se mede em amenities. Mede‑se em manhãs
                lentas, luz a entrar pela janela, caminhos de terra e janelas que
                enquadram o horizonte.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <img
                src="/experiencia-1.jpg"
                className="h-40 w-full rounded-lg object-cover"
                alt="Interior Nestish"
              />
              <img
                src="/experiencia-2.jpg"
                className="h-40 w-full rounded-lg object-cover"
                alt="Exterior Nestish"
              />
              <img
                src="/experiencia-3.jpg"
                className="h-40 w-full rounded-lg object-cover md:col-span-2"
                alt="Paisagem Nestish"
              />
            </div>
          </div>
        </section>

        {/* Curadoria */}
        <section className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Curadoria
            </p>
            <h2 className="mt-4 text-2xl font-light">
              Três pilares. Um só propósito.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-light">Natureza</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Refúgios inseridos em paisagens com verdade, sem artifício.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-light">Arquitetura</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Materiais honestos, proporções calmas, luz pensada.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-light">Silêncio</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  Lugares onde o ruído fica lá fora e o tempo se estende.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contacto" className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-neutral-500">
              Nestish — refúgios com alma.
            </div>
            <div className="flex gap-6 text-xs text-neutral-500">
              <span>contacto@nestish.com</span>
              <span>@nestish</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
