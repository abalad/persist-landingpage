import { describe, expect, it } from "vitest";
import { AGENT_CYCLE_MS, DEPLOY_CYCLE_MS, TESTS_CYCLE_MS, TESTS_TOTAL, agentAt, beltAt, deployAt, devAt, rocketAt, testsAt } from "@/components/studio/beat";

describe("agentAt", () => {
  it("reads, edits, runs the tests, then stops to ask for you", () => {
    expect(agentAt(0).kind).toBe("reading");
    const kinds = Array.from({ length: Math.ceil(AGENT_CYCLE_MS / 250) }, (_, i) => agentAt(i * 250).kind);
    expect(kinds).toContain("editing");
    expect(kinds).toContain("testing");
    expect(kinds).toContain("asking");
    expect(kinds).toContain("done");
    expect(kinds.indexOf("asking")).toBeGreaterThan(kinds.indexOf("editing"));
  });

  it("works on another file each time round", () => {
    expect(agentAt(0).file).not.toBe(agentAt(AGENT_CYCLE_MS).file);
    expect(agentAt(2 * AGENT_CYCLE_MS + 10).kind).toBe("reading");
  });
});

describe("testsAt", () => {
  it("counts up through a suite and holds it done before the next", () => {
    expect(testsAt(0)).toMatchObject({ passed: 0, done: false });
    let last = 0;
    for (let t = 0; t < TESTS_CYCLE_MS; t += 100) {
      const now = testsAt(t);
      expect(now.passed).toBeGreaterThanOrEqual(last);
      expect(now.passed).toBeLessThanOrEqual(TESTS_TOTAL);
      last = now.passed;
    }
    expect(testsAt(TESTS_CYCLE_MS - 1)).toMatchObject({ passed: TESTS_TOTAL, done: true });
    expect(testsAt(TESTS_CYCLE_MS + 1).suite).not.toBe(testsAt(0).suite);
  });
});

describe("deployAt and rocketAt", () => {
  it("builds, launches, then shows how long ago it went live", () => {
    expect(deployAt(1000)).toMatchObject({ state: "building" });
    expect(deployAt(1000).progress).toBeGreaterThan(0);
    expect(deployAt(9000).state).toBe("launching");
    const live = deployAt(13000);
    expect(live.state).toBe("live");
    expect(live.since).toBeGreaterThanOrEqual(1);
    expect(deployAt(DEPLOY_CYCLE_MS + 500).state).toBe("building");
  });

  it("keeps the rocket on its pad while building and sends it up at launch", () => {
    expect(rocketAt(3000).y).toBe(0);
    expect(rocketAt(3000).flame).toBe(0);
    expect(rocketAt(9500).y).toBeGreaterThan(0);
    expect(rocketAt(9500).flame).toBeGreaterThan(0);
    expect(rocketAt(10200).y).toBeGreaterThan(rocketAt(9500).y);
  });
});

describe("devAt", () => {
  it("keeps a short request log and a request-rate bar chart moving", () => {
    const a = devAt(0);
    const b = devAt(2000);
    expect(a.lines).toHaveLength(3);
    expect(a.lines).not.toEqual(b.lines);
    expect(a.bars).toHaveLength(12);
    for (const v of a.bars) {
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThanOrEqual(1);
    }
    expect(devAt(2000)).toEqual(b);
  });
});

describe("beltAt", () => {
  it("spaces the boxes evenly along the belt and moves them on", () => {
    const now = beltAt(0, 6);
    expect(now).toHaveLength(6);
    expect(now[1]! - now[0]!).toBeCloseTo(1 / 6);
    const later = beltAt(1000, 6);
    expect(later[0]).not.toBe(now[0]);
    for (const s of later) expect(s >= 0 && s < 1).toBe(true);
  });
});
