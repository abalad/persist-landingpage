"use client";

import { FolderGit2, History, ListPlus, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { Chip, SessionHeader, Terminal, Window, cx, type TermLine } from "./parts";
import x from "./extra.module.css";
import styles from "./ProTabs.module.css";

type Tab = "queue" | "restore" | "verify" | "worktree";
const TABS: { id: Tab; icon: ReactNode }[] = [
  { id: "queue", icon: <ListPlus /> },
  { id: "restore", icon: <History /> },
  { id: "verify", icon: <ShieldCheck /> },
  { id: "worktree", icon: <FolderGit2 /> },
];

export function ProTabs() {
  const t = useTranslations("mock.pro");
  const m = useTranslations("mock");
  const [tab, setTab] = useState<Tab>("queue");
  const lines = (m.raw("hero.lines") as TermLine[]).slice(0, 7);

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label={t("label")}>
        {TABS.map((tb) => (
          <button
            key={tb.id}
            type="button"
            role="tab"
            id={`pro-tab-${tb.id}`}
            aria-selected={tab === tb.id}
            aria-controls="pro-panel"
            className={styles.tab}
            onClick={() => setTab(tb.id)}
          >
            <span aria-hidden="true">{tb.icon}</span>
            {t(`tabs.${tb.id}`)}
          </button>
        ))}
      </div>
      <div id="pro-panel" role="tabpanel" aria-labelledby={`pro-tab-${tab}`}>
        <Window label={`${t("label")} ${t(`tabs.${tab}`)}`} designWidth={1060}>
          <SessionHeader
            name="api"
            kind="claude"
            branch={tab === "worktree" ? t("worktree.branchValue") : "main"}
            status={
              tab === "verify" ? (
                <>
                  <Chip tone="ok" icon="waiting" label={m("states.waiting")} />
                  <Chip tone="ok" icon="done" label={`${t("verify.chip")} · ${t("verify.passed")}`} />
                </>
              ) : (
                <Chip tone="info" icon="working" label={m("states.working")} />
              )
            }
          />
          <div className={x.split} style={{ ["--side" as string]: 440, ["--h" as string]: 330 }}>
            <div className={x.splitMain}>
              <Terminal lines={tab === "verify" ? (t.raw("verify.lines") as TermLine[]) : lines} rows={8} />
            </div>
            <div className={x.sideFill}>
              <div className={x.panelTabs}>
                {TABS.map((tb) => (
                  <span key={tb.id} className={cx(x.panelTab, tab === tb.id && x.panelTabOn)}>
                    {tb.icon}
                  </span>
                ))}
              </div>
              <div className={x.panelBody} key={tab}>
                {tab === "queue" ? queuePanel() : null}
                {tab === "restore" ? restorePanel() : null}
                {tab === "verify" ? verifyPanel() : null}
                {tab === "worktree" ? worktreePanel() : null}
              </div>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );

  function queuePanel() {
    return (
      <>
        <span className={x.panelHeading}>{t("tabs.queue")}</span>
        <span className={x.label}>{t("queue.text")}</span>
        <span className={cx(x.field, x.fieldTall)}>{t("queue.draft")}</span>
        <span className={x.label}>{t("queue.when")}</span>
        <span className={cx(x.field, x.select)}>{t("queue.whenValue")} ▾</span>
        <span className={x.btnRow}>
          <span className={x.btn}>{t("queue.add")}</span>
        </span>
        <span className={x.label}>{t("queue.waiting")}</span>
        <span className={x.listItem}>
          <span className={x.listTitle}>{t("queue.item1")}</span>
          <span className={x.listSub}>{t("queue.item1When")}</span>
        </span>
        <span className={x.listItem}>
          <span className={x.listTitle}>{t("queue.item2")}</span>
          <span className={x.listSub}>{t("queue.item2When")}</span>
        </span>
      </>
    );
  }

  function restorePanel() {
    return (
      <>
        <span className={x.panelHeading}>{t("tabs.restore")}</span>
        <span className={x.note}>{t("restore.note")}</span>
        <span className={cx(x.listItem, x.listItemOn)}>
          <span className={x.listTitle}>{t("restore.point1")}</span>
          <span className={x.listSub}>{t("restore.point1Meta")}</span>
        </span>
        <span className={x.listItem}>
          <span className={x.listTitle}>{t("restore.point2")}</span>
          <span className={x.listSub}>{t("restore.point2Meta")}</span>
        </span>
        <span className={x.listItem}>
          <span className={x.listTitle}>{t("restore.point3")}</span>
          <span className={x.listSub}>{t("restore.point3Meta")}</span>
        </span>
        <span className={x.btnRow}>
          <span className={cx(x.btn, x.btnGhost)}>{t("restore.action")}</span>
        </span>
      </>
    );
  }

  function verifyPanel() {
    return (
      <>
        <span className={x.panelHeading}>{t("tabs.verify")}</span>
        <span className={x.note}>{t("verify.note")}</span>
        <span className={x.label}>{t("verify.chip")}</span>
        <span className={cx(x.field, "mono")} style={{ fontFamily: "var(--font-code)" }}>
          {t("verify.command")}
        </span>
        <span>
          <Chip tone="ok" icon="done" label={t("verify.passed")} />
        </span>
      </>
    );
  }

  function worktreePanel() {
    return (
      <>
        <span className={x.panelHeading}>{t("worktree.title")}</span>
        <dl className={x.kv}>
          <dt>{t("worktree.branch")}</dt>
          <dd style={{ fontFamily: "var(--font-code)" }}>{t("worktree.branchValue")}</dd>
          <dt>{t("worktree.folder")}</dt>
          <dd>{t("worktree.folderValue")}</dd>
        </dl>
        <span className={x.label}>{t("worktree.close")}</span>
        <span className={cx(x.radio, x.radioOn)}>{t("worktree.keep")}</span>
        <span className={x.radio}>{t("worktree.leave")}</span>
        <span className={x.radio}>{t("worktree.discard")}</span>
        <span className={x.note}>{t("worktree.commits")}</span>
      </>
    );
  }
}
