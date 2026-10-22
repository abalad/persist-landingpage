import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import x from "./extra.module.css";

interface NetRow {
  host: string;
  why: string;
  size: string;
  time: string;
}

export function NetworkMock() {
  const t = useTranslations("mock.network");
  const rows = t.raw("rows") as NetRow[];
  return (
    <div className={x.settings}>
      <div className={x.settingsTitle}>{t("title")}</div>
      <div className={x.group}>{t("group")}</div>
      <div className={x.box}>
        {rows.map((r, i) => (
          <div key={i} className={x.boxRow}>
            <Globe style={{ color: "var(--color-fg-subtle)" }} />
            <div className={x.boxMain}>
              <span className={`${x.boxTitle} ${x.host}`}>
                {r.host.split(".").map((part, j) => (
                  <Fragment key={j}>
                    {j > 0 ? "." : null}
                    {j > 0 ? <wbr /> : null}
                    {part}
                  </Fragment>
                ))}
              </span>
              <span className={x.boxSub}>
                {r.why} · {r.size}
              </span>
            </div>
            <span style={{ color: "var(--color-ok)", fontFamily: "var(--font-code)", fontSize: "calc(12 * var(--u))" }}>200</span>
            <span style={{ color: "var(--color-fg-subtle)", fontSize: "calc(12 * var(--u))" }}>{r.time}</span>
          </div>
        ))}
      </div>
      <p className={x.note} style={{ marginTop: "calc(12 * var(--u))" }}>
        {t("never")}
      </p>
    </div>
  );
}
