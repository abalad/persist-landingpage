import type { Platform } from "./platform";

export type DesktopPlatform = Exclude<Platform, "other">;

export interface Release {
  /** `soon` until a signed public build exists; then fill `url` and `version`. */
  status: "soon" | "available";
  url?: string;
  version?: string;
}

/** The one place to switch a platform to a real download. */
export const RELEASES: Record<DesktopPlatform, Release> = {
  mac: { status: "soon" },
  windows: { status: "soon" },
  linux: { status: "soon" },
};

export const PLATFORM_ORDER: DesktopPlatform[] = ["mac", "windows", "linux"];
