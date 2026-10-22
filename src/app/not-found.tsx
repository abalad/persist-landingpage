import Link from "next/link";
import { jetbrains, mona } from "@/app/fonts";
import "@/styles/globals.css";

/**
 * Addresses the language proxy never sees (paths with a dot, like /docs/x.md)
 * land here, outside any language, so the page speaks the three.
 */
export default function RootNotFound() {
  return (
    <html lang="pt-BR" className={`${mona.variable} ${jetbrains.variable}`}>
      <body>
        <main className="container" style={{ paddingTop: "clamp(56px, 10vw, 128px)" }}>
          <h1 style={{ fontSize: "clamp(2.125rem, 1.2rem + 3vw, 3.5rem)", fontWeight: 330, fontVariationSettings: '"wdth" 106', letterSpacing: "-0.03em" }}>
            Página não encontrada
          </h1>
          <p style={{ marginTop: 16, color: "var(--site-muted)" }} lang="en">
            Page not found · Página no encontrada
          </p>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 32 }} aria-label="Persisty">
            <Link href="/" style={{ color: "var(--color-accent)" }}>
              Persisty
            </Link>
            <Link href="/en" style={{ color: "var(--color-accent)" }} lang="en">
              English
            </Link>
            <Link href="/es" style={{ color: "var(--color-accent)" }} lang="es">
              Español
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
