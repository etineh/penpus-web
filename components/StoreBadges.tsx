"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function StoreBadges({ withBrowser = false }: { withBrowser?: boolean }) {
  const [toast, setToast] = useState(false);

  // Auto-dismiss the "coming soon" note a beat after it appears.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="cta-row">
      <a className="store-img" href={site.appStoreUrl} aria-label="Download Penpus on the App Store">
        <img src="/app_store_badge.png" alt="Download on the App Store" />
      </a>
      <a className="store-img" href={site.playStoreUrl} aria-label="Get Penpus on Google Play">
        <img src="/play_store_badge.png" alt="Get it on Google Play" />
      </a>
      {withBrowser && (
        <a
          className="browser-link"
          href={site.webAppUrl}
          onClick={(e) => {
            e.preventDefault();
            setToast(true);
          }}
        >
          Continue in browser →
        </a>
      )}

      <div className="toast-live" role="status" aria-live="polite">
        {toast && <span className="toast">Coming soon — grab the app for now.</span>}
      </div>
    </div>
  );
}
