import { TESTS_TOTAL, type AgentBeat, type deployAt, type testsAt } from "./beat";

/**
 * The big screen at the back of the studio is the app: Persisty with the
 * project's sessions and their states, live, the same ones the cards show.
 */
export const APP_SCREEN = { w: 960, h: 560 };

export interface StudioState {
  agent: AgentBeat;
  tests: ReturnType<typeof testsAt>;
  deploy: ReturnType<typeof deployAt>;
}

const C = {
  bg: "#0f1115",
  bar: "#151821",
  row: "#1b1f2a",
  text: "#d8dde6",
  dim: "#7c859a",
  lime: "#c6f24e",
  amber: "#e3b24a",
  blue: "#7aa7e8",
};
const MONO = '"SF Mono", Menlo, Monaco, monospace';
const UI = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/** A rounded rectangle path; `roundRect` is missing from older WebKit (macOS 12). */
function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** The words on the screen: each state of the agent, and the deploy's two that are not a percentage. */
export interface ScreenLabels {
  agent: Record<AgentBeat["kind"], string>;
  launching: string;
  live: string;
}

export const SCREEN_LABELS: ScreenLabels = {
  agent: {
    reading: "lendo",
    editing: "editando",
    testing: "rodando testes",
    asking: "esperando você",
    applying: "aplicando",
    done: "concluído",
  },
  launching: "publicando",
  live: "no ar",
};

/** Changes only when the drawing would, so the texture is redrawn on state changes alone. */
export function appScreenKey(s: StudioState): string {
  return `${s.agent.kind}:${s.agent.file}:${s.tests.passed}:${s.tests.suite}:${s.deploy.state}:${Math.floor(s.deploy.progress * 20)}`;
}

/** The four sessions on the screen: the agent, the tests, the dev server, the deploy. */
export function screenRows(s: StudioState, labels: ScreenLabels = SCREEN_LABELS): Array<{ name: string; label: string; color: string; progress: number }> {
  const asking = s.agent.kind === "asking";
  return [
    { name: "claude", label: labels.agent[s.agent.kind], color: asking ? C.amber : s.agent.kind === "done" ? C.lime : C.blue, progress: s.agent.progress },
    { name: `pnpm test ${s.tests.suite}`, label: `${s.tests.passed}/${TESTS_TOTAL}`, color: s.tests.done ? C.lime : C.blue, progress: s.tests.passed / TESTS_TOTAL },
    { name: "pnpm dev", label: ":5173", color: C.lime, progress: 1 },
    { name: "deploy web", label: s.deploy.state === "live" ? labels.live : s.deploy.state === "launching" ? labels.launching : `${Math.round(s.deploy.progress * 100)}%`, color: s.deploy.state === "live" ? C.lime : C.blue, progress: s.deploy.progress },
  ];
}

export function drawAppScreen(ctx: CanvasRenderingContext2D, s: StudioState, labels: ScreenLabels = SCREEN_LABELS) {
  const { w, h } = APP_SCREEN;
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, w, h);
  // Rail of projects, the first one current.
  ctx.fillStyle = C.bar;
  ctx.fillRect(0, 0, 110, h);
  ["#c6f24e", "#7aa7e8", "#e3b24a", "#ef7d7d"].forEach((color, i) => {
    const y = 30 + i * 78;
    ctx.fillStyle = C.row;
    rounded(ctx, 26, y, 58, 58, 15);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(55, y + 29, 11, 0, Math.PI * 2);
    ctx.fill();
    if (i === 0) {
      ctx.strokeStyle = C.lime;
      ctx.lineWidth = 3;
      rounded(ctx, 26, y, 58, 58, 15);
      ctx.stroke();
    }
  });
  ctx.fillStyle = C.text;
  ctx.font = `600 34px ${UI}`;
  ctx.fillText("web", 144, 64);
  ctx.fillStyle = C.dim;
  ctx.font = `400 24px ${MONO}`;
  ctx.fillText("main", 222, 64);

  const rows = screenRows(s, labels);
  rows.forEach(({ name, label, color, progress }, i) => {
    const y = 104 + i * 108;
    ctx.fillStyle = C.row;
    rounded(ctx, 136, y, w - 166, 90, 16);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(176, y + 45, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.text;
    ctx.font = `500 30px ${MONO}`;
    ctx.fillText(name, 206, y + 55);
    ctx.font = `600 26px ${UI}`;
    const width = ctx.measureText(label).width + 44;
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = color;
    rounded(ctx, w - 58 - width, y + 24, width, 42, 21);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillText(label, w - 36 - width, y + 54);
    // A thin progress line along the row's bottom.
    ctx.globalAlpha = 0.85;
    ctx.fillRect(152, y + 82, (w - 198) * Math.min(1, Math.max(0, progress)), 4);
    ctx.globalAlpha = 1;
  });
}
