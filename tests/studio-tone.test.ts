import { describe, expect, it } from "vitest";
import { toneMapped, untoneMapped } from "@/components/studio/tone";

const channels = (hex: number) => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];

describe("untoneMapped", () => {
  it("finds the clear colour that reaches the screen as the page colour, for the site and the app", () => {
    for (const hex of [0x0a0c10, 0x0f1115]) {
      const linear = untoneMapped(hex, 1.05);
      expect(linear.every((c) => c >= 0)).toBe(true);
      const back = channels(toneMapped(linear, 1.05));
      channels(hex).forEach((c, i) => expect(Math.abs(back[i]! - c)).toBeLessThanOrEqual(1));
    }
  });

  it("without it, the site's ground comes out almost black", () => {
    const naive = channels(0x0a0c10).map((c) => (c / 255) ** 2.2) as [number, number, number];
    expect(channels(toneMapped(naive, 1.05)).every((c) => c <= 3)).toBe(true);
  });

  it("gets as close as the tone curve allows for the light theme's near-white", () => {
    const back = channels(toneMapped(untoneMapped(0xf6f7f9, 1.05), 1.05));
    channels(0xf6f7f9).forEach((c, i) => expect(Math.abs(back[i]! - c)).toBeLessThanOrEqual(2));
  });
});
