"use client";

import { site } from "@/lib/site";

// Sends iOS/iPadOS visitors to the App Store and everyone else to Google Play.
// Falls back to the Play Store href for no-JS clients and crawlers.
export default function GetAppButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) {
      e.preventDefault();
      window.location.href = site.appStoreUrl;
    }
  }

  return (
    <a className={className} style={style} href={site.playStoreUrl} onClick={handleClick}>
      {children}
    </a>
  );
}
