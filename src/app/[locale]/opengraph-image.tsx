import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Persisty";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** The share card: the app icon and the page's promise, in the visitor's language. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const icon = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/app-icon.png")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0a0c10", color: "#f2f4f8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={icon} width={72} height={72} alt="" style={{ borderRadius: 16 }} />
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>persisty</span>
        </div>
        <div style={{ display: "flex", fontSize: 60, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 980 }}>{t("title")}</div>
        <div style={{ display: "flex", width: 160, height: 6, borderRadius: 3, background: "#C6F24E" }} />
      </div>
    ),
    size,
  );
}
