"use client";

import { useEffect, useState } from "react";

/**
 * Steps through `durations` (ms per step) while `running`, looping back to 0.
 * Paused, it keeps the current step, so leaving the screen never restarts the story.
 */
export function useTimeline(durations: number[], running: boolean, initial = 0): number {
  const [step, setStep] = useState(initial);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => window.clearTimeout(id);
  }, [step, running, durations]);

  return step;
}
