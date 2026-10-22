export type Platform = "mac" | "windows" | "linux" | "other";

/**
 * The desktop system a visitor is on, from what the browser says. Phones,
 * tablets and Chromebooks are "other": Persisty has nothing to install there.
 * iPadOS reports itself as a Mac; touch points give it away.
 */
export function detectPlatform(userAgent: string, platform = "", maxTouchPoints = 0): Platform {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod|android|cros/.test(ua)) return "other";
  if (ua.includes("macintosh") || platform.toLowerCase().startsWith("mac")) {
    return maxTouchPoints > 1 ? "other" : "mac";
  }
  if (ua.includes("windows")) return "windows";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return "other";
}
