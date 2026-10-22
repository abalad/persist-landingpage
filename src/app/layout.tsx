import type { ReactNode } from "react";

/** The real document lives in [locale]/layout; this one only lets not-found.tsx exist at the root. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
