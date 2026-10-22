import { describe, expect, it } from "vitest";
import { agentAt, deployAt, testsAt } from "@/components/studio/beat";
import { screenRows, type ScreenLabels } from "@/components/studio/screens";

// 9.2 s in: the agent is asking for you; 12 s in: the deploy is live.
const state = { agent: agentAt(9_200), tests: testsAt(9_200), deploy: deployAt(12_000) };

const en: ScreenLabels = {
  agent: { reading: "reading", editing: "editing", testing: "running tests", asking: "waiting for you", applying: "applying", done: "done" },
  launching: "publishing",
  live: "live",
};

describe("the big screen in the studio", () => {
  it("speaks Portuguese unless told otherwise", () => {
    const labels = screenRows(state).map((row) => row.label);
    expect(labels[0]).toBe("esperando você");
    expect(labels[3]).toBe("no ar");
  });

  it("takes the visitor's language", () => {
    const labels = screenRows(state, en).map((row) => row.label);
    expect(labels[0]).toBe("waiting for you");
    expect(labels[3]).toBe("live");
  });
});
