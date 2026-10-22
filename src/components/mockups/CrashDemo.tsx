"use client";

import { Power, RotateCcw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { buttonClass, ButtonIcon } from "@/components/site/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AgentGlyph, Chip, Rail, Terminal, TopBar, Window, cx, type AgentKind, type TermLine, type Tone } from "./parts";
import s from "./app.module.css";
import c from "./crash.module.css";

type Mode = "computer" | "app";
type Phase = "running" | "off" | "black" | "boot" | "quit" | "gone" | "report";

interface Row {
  name: string;
  detail: string;
  kind: AgentKind;
  outcome: "reattached" | "respawned" | "resumed";
  unverified?: boolean;
  reason: string;
}

/** How long each phase lasts before the next one, per scenario. */
const SCRIPT: Record<Mode, [Phase, number][]> = {
  computer: [
    ["off", 620],
    ["black", 1500],
    ["boot", 1100],
    ["report", 0],
  ],
  app: [
    ["quit", 420],
    ["gone", 2100],
    ["report", 0],
  ],
};

const ROW_STAGGER = 520;

export function CrashDemo() {
  const t = useTranslations("mock");
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode | null>(null);
  const [phase, setPhase] = useState<Phase>("running");
  const [settled, setSettled] = useState(0);
  const timers = useRef<number[]>([]);

  const review = t("sessions.review");
  const rows: Row[] = [
    { name: "api", detail: "Claude Code", kind: "claude", outcome: "resumed", reason: "claude --resume 8f2c41e0" },
    { name: "checkout", detail: "Claude Code", kind: "claude", outcome: "resumed", reason: "claude --resume 1b7d93aa" },
    { name: "dev", detail: "pnpm dev", kind: "shell", outcome: "respawned", reason: "pnpm dev" },
    { name: review, detail: "Codex", kind: "codex", outcome: "resumed", unverified: true, reason: "codex resume" },
  ];

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run(next: Mode) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMode(next);
    setSettled(0);
    if (reduced) {
      setPhase("report");
      setSettled(rows.length);
      return;
    }
    let at = 0;
    for (const [p, ms] of SCRIPT[next]) {
      timers.current.push(window.setTimeout(() => setPhase(p), at));
      at += ms;
    }
    for (let i = 1; i <= rows.length; i++) {
      timers.current.push(window.setTimeout(() => setSettled(i), at + 350 + i * ROW_STAGGER));
    }
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    setMode(null);
    setPhase("running");
    setSettled(0);
  }

  const done = phase === "report" && settled === rows.length;
  const lines = (t.raw("hero.lines") as TermLine[]).slice(0, 7);
  const showApp = phase === "running" || phase === "off" || phase === "quit" || phase === "report";

  const tabTone = (i: number): Tone => {
    if (phase !== "report") return i === 2 ? "ok" : "info";
    return i < settled ? (rows[i].unverified ? "warn" : "ok") : "neutral";
  };

  const summary =
    mode === "app" ? t("crash.reattachedSummary", { count: rows.length }) : t("crash.summary", { recovered: rows.length, failed: 0, skipped: 0 });

  return (
    <div className={c.demo}>
      <div className={c.controls}>
        {mode === null ? (
          <div className={c.buttons}>
            <button type="button" className={buttonClass("primary", "md")} onClick={() => run("computer")}>
              <ButtonIcon>
                <Power />
              </ButtonIcon>
              {t("crash.crashComputer")}
            </button>
            <button type="button" className={buttonClass("secondary", "md")} onClick={() => run("app")}>
              <ButtonIcon>
                <X />
              </ButtonIcon>
              {t("crash.closeApp")}
            </button>
          </div>
        ) : (
          <button type="button" className={buttonClass("secondary", "md")} onClick={reset} disabled={!done}>
            <ButtonIcon>
              <RotateCcw />
            </ButtonIcon>
            {t("crash.again")}
          </button>
        )}
        <span className={c.hint}>{t("crash.hint")}</span>
      </div>

      <Window label={t("crash.label")} designWidth={940}>
        <TopBar
          project="Rota"
          tabs={rows.map((r, i) => ({ name: r.name, kind: r.kind, tone: tabTone(i), active: i === 0 }))}
        />
        <div className={s.body}>
          <Rail projects={[{ letter: "R", active: true }, { letter: "Q" }, { letter: "B" }]} />
          <div className={c.stage}>
            {showApp ? (
              <div
                key={phase === "report" ? "after" : "before"}
                className={cx(c.content, phase === "off" && c.off, phase === "quit" && c.quit, phase === "report" && c.back)}
              >
                {phase === "report" ? (
                  <div className={c.report}>
                    <div className={c.reportHead}>
                      <span className={c.reportTitle}>{t("crash.report")}</span>
                    </div>
                    <p className={c.summary}>{done ? summary : ""}</p>
                    <table className={c.table}>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr key={r.name}>
                            <td>
                              <span className={c.who}>
                                <AgentGlyph kind={r.kind} />
                                {r.name}
                                <small>{r.detail}</small>
                              </span>
                            </td>
                            <td>
                              {i < settled ? (
                                <span className={c.rowIn}>
                                  {outcomeChip(r)}
                                </span>
                              ) : (
                                <Chip tone="info" icon="recovering" label={t("states.recovering")} />
                              )}
                            </td>
                            <td className={cx(c.reason, s.mono)}>{i < settled && mode === "computer" ? r.reason : ""}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <>
                    <div className={s.sessionHeader}>
                      <span className={s.sessionName}>
                        <AgentGlyph kind="claude" />
                        api
                      </span>
                      <Chip tone="info" icon="working" label={t("states.working")} />
                    </div>
                    <Terminal lines={lines} rows={11} />
                  </>
                )}
              </div>
            ) : null}

            {phase === "black" ? <div className={c.black}>{t("crash.black")}</div> : null}
            {phase === "boot" ? (
              <div className={c.black}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={c.bootIcon} src="/app-icon.png" alt="" />
                {t("crash.opening")}
              </div>
            ) : null}
            {phase === "gone" ? (
              <div className={cx(c.black, c.desk)}>
                {t("crash.closed")}
                <span className={c.alive}>
                  {rows.map((r) => (
                    <span key={r.name}>
                      <i />
                      {r.name}
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </Window>
      <p className="visually-hidden" aria-live="polite">
        {done ? summary : ""}
      </p>
    </div>
  );

  function outcomeChip(row: Row) {
    if (mode === "app") return <Chip tone="ok" icon="done" label={t("crash.outcome.reattached")} />;
    const label = t(`crash.outcome.${row.outcome}`) + (row.unverified ? ` (${t("crash.outcome.unverified")})` : "");
    return <Chip tone={row.unverified ? "warn" : "ok"} icon="done" label={label} />;
  }
}
