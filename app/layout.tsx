// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="text-stone-200">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
          <a href="/" className="text-sm tracking-[0.3em] uppercase">
            nestish.
          </a>

          <nav className="flex items-center gap-10 text-xs tracking-[0.25em] uppercase">
            <a href="/al-ar" className="hover:opacity-70">AL&AR</a>
            <a href="/manifesto" className="hover:opacity-70">Manifesto</a>
            <a href="/curadoria" className="hover:opacity-70">Curadoria</a>
          </nav>

          <a
            href="/login"
            className="text-xs tracking-[0.25em] uppercase border border-stone-200 rounded-full px-4 py-2 hover:bg-stone-200 hover:text-stone-900 transition-all"
          >
            Entrar
          </a>
        </header>

        {children}
      </body>
    </html>
  );
}
