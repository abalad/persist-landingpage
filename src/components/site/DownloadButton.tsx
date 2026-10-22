"use client";

import { ArrowDownToLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { detectPlatform, type Platform } from "@/lib/platform";
import { ButtonLink, type ButtonSize, type ButtonVariant } from "./Button";

const noop = () => () => {};

/** The visitor's own system, read once on the client; the server renders the Mac label. */
export function usePlatform(): Platform {
  return useSyncExternalStore(
    noop,
    () => detectPlatform(navigator.userAgent, navigator.platform, navigator.maxTouchPoints),
    () => "mac",
  );
}

export function DownloadButton({ size = "lg", variant = "primary" }: { size?: ButtonSize; variant?: ButtonVariant }) {
  const t = useTranslations("home.hero.download");
  const platform = usePlatform();
  return (
    <ButtonLink href={platform === "other" ? "/download" : `/download#${platform}`} size={size} variant={variant} icon={<ArrowDownToLine />}>
      {t(platform)}
    </ButtonLink>
  );
}
