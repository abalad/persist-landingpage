/**
 * What the welcome studio is doing at any moment, apart from the 3D so it
 * can be read and tested on its own. Each part runs its own loop, forever,
 * so the cards keep changing: the agent works through a task and stops to
 * ask for you; a test suite counts up and passes; a deploy builds and the
 * rocket goes; the dev server answers requests; boxes ride the belt.
 */

const frac = (x: number) => x - Math.floor(x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeIn = (x: number) => clamp01(x) ** 2;
const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3;

// ---- the agent ----------------------------------------------------------------

export type AgentKind = "reading" | "editing" | "testing" | "asking" | "applying" | "done";

const AGENT_STEPS: ReadonlyArray<{ kind: AgentKind; ms: number }> = [
  { kind: "reading", ms: 3_000 },
  { kind: "editing", ms: 3_200 },
  { kind: "testing", ms: 2_600 },
  { kind: "asking", ms: 4_200 },
  { kind: "applying", ms: 2_600 },
  { kind: "done", ms: 2_400 },
];
export const AGENT_CYCLE_MS = AGENT_STEPS.reduce((sum, s) => sum + s.ms, 0);
const AGENT_FILES = ["src/auth/session.ts", "api/billing.ts", "web/Header.tsx", "db/migrations/012.sql"];
const AGENT_DIFFS = ["+18 −7", "+42 −3", "+9 −12", "+27 −0"];

export interface AgentBeat {
  kind: AgentKind;
  file: string;
  diff: string;
  /** 0…1 through the current step. */
  progress: number;
}

export function agentAt(ms: number): AgentBeat {
  const round = Math.floor(ms / AGENT_CYCLE_MS);
  let t = ms - round * AGENT_CYCLE_MS;
  const file = AGENT_FILES[round % AGENT_FILES.length] as string;
  const diff = AGENT_DIFFS[round % AGENT_DIFFS.length] as string;
  for (const step of AGENT_STEPS) {
    if (t < step.ms) return { kind: step.kind, file, diff, progress: t / step.ms };
    t -= step.ms;
  }
  return { kind: "done", file, diff, progress: 1 };
}

// ---- the tests ------------------------------------------------------------------

export const TESTS_CYCLE_MS = 14_000;
export const TESTS_TOTAL = 40;
const TESTS_RUN_MS = 10_000;
const SUITES = ["auth", "billing", "projects", "ui"];

export function testsAt(ms: number): { suite: string; passed: number; done: boolean } {
  const round = Math.floor(ms / TESTS_CYCLE_MS);
  const t = ms - round * TESTS_CYCLE_MS;
  return {
    suite: SUITES[round % SUITES.length] as string,
    passed: Math.min(TESTS_TOTAL, Math.floor((TESTS_TOTAL * t) / TESTS_RUN_MS)),
    done: t >= TESTS_RUN_MS,
  };
}

// ---- the deploy, and its rocket ---------------------------------------------------

export const DEPLOY_CYCLE_MS = 16_000;
const BUILD_MS = 8_500;
const LIFTOFF_AT = 9_000;
const LIVE_AT = 11_000;

export function deployAt(ms: number): { state: "building" | "launching" | "live"; progress: number; since: number } {
  const t = ms % DEPLOY_CYCLE_MS;
  if (t < BUILD_MS) return { state: "building", progress: t / BUILD_MS, since: 0 };
  if (t < LIVE_AT) return { state: "launching", progress: 1, since: 0 };
  return { state: "live", progress: 1, since: Math.floor((t - LIVE_AT) / 1_000) + 1 };
}

/** Height above the pad and the flame's strength. A fresh rocket rises out of the pad after each launch. */
export function rocketAt(ms: number): { y: number; flame: number } {
  const t = ms % DEPLOY_CYCLE_MS;
  if (t < 900) return { y: -1.1 * (1 - easeOut(t / 900)), flame: 0 };
  if (t < BUILD_MS) return { y: 0, flame: 0 };
  if (t < LIFTOFF_AT) return { y: 0, flame: easeOut((t - BUILD_MS) / 500) * 0.6 };
  if (t < LIVE_AT + 1_500) return { y: easeIn((t - LIFTOFF_AT) / 2_000) * 10, flame: 1 };
  return { y: 14, flame: 0 };
}

// ---- the dev server -----------------------------------------------------------------

const REQUESTS = ["GET /api/projects 200", "GET /api/session 200", "POST /api/login 201", "GET /assets/app.js 304", "GET /api/usage 200", "PUT /api/tasks/42 200"];

export function devAt(ms: number): { lines: string[]; bars: number[]; rps: number } {
  const tick = Math.floor(ms / 900);
  const lines = [0, 1, 2].map((i) => REQUESTS[(tick + i) % REQUESTS.length] as string);
  const bars = Array.from({ length: 12 }, (_, i) => 0.25 + 0.75 * frac(Math.sin((tick + i) * 12.9898) * 43758.5453));
  return { lines, bars, rps: Math.round(20 + (bars[11] as number) * 40) };
}

// ---- the belt -------------------------------------------------------------------------

const BELT_MS = 20_000;

/** Where each of `count` boxes is along the belt, 0…1, evenly spaced. */
export function beltAt(ms: number, count: number): number[] {
  const base = (ms % BELT_MS) / BELT_MS;
  return Array.from({ length: count }, (_, i) => frac(i / count + base));
}
