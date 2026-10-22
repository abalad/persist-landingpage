import { describe, expect, it } from "vitest";
import { detectPlatform } from "../src/lib/platform";

const UA = {
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
  linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36",
  chromebook: "Mozilla/5.0 (X11; CrOS x86_64 16002.44.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
};

describe("detectPlatform", () => {
  it("recognises a Mac", () => expect(detectPlatform(UA.mac)).toBe("mac"));
  it("recognises Windows", () => expect(detectPlatform(UA.windows)).toBe("windows"));
  it("recognises desktop Linux", () => expect(detectPlatform(UA.linux)).toBe("linux"));
  it("treats an iPhone as other", () => expect(detectPlatform(UA.iphone)).toBe("other"));
  it("treats Android as other, though its agent says Linux", () => expect(detectPlatform(UA.android)).toBe("other"));
  it("treats a Chromebook as other", () => expect(detectPlatform(UA.chromebook)).toBe("other"));
  it("treats an iPad that claims to be a Mac as other", () => expect(detectPlatform(UA.mac, "MacIntel", 5)).toBe("other"));
  it("treats an empty agent as other", () => expect(detectPlatform("")).toBe("other"));
});
