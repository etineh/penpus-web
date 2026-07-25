import { site } from "@/lib/site";

export default function StoreBadges({ withBrowser = false }: { withBrowser?: boolean }) {
  return (
    <div className="cta-row">
      <a className="store-img" href={site.appStoreUrl} aria-label="Download Penpus on the App Store">
        <img src="/app_store_badge.png" alt="Download on the App Store" />
      </a>
      <a className="store-img" href={site.playStoreUrl} aria-label="Get Penpus on Google Play">
        <img src="/play_store_badge.png" alt="Get it on Google Play" />
      </a>
      {withBrowser && (
        <a className="browser-link" href={site.webAppUrl}>
          Continue in browser →
        </a>
      )}
    </div>
  );
}
