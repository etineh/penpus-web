import { site } from "@/lib/site";
import { AppleGlyph, PlayGlyph } from "./Icons";

export default function StoreBadges({ withBrowser = false }: { withBrowser?: boolean }) {
  return (
    <div className="cta-row">
      <a className="store-badge" href={site.appStoreUrl} aria-label="Download Penpus on the App Store">
        <AppleGlyph />
        <span className="lines">
          <span className="tiny">Download on the</span>
          <span className="big">App Store</span>
        </span>
      </a>
      <a className="store-badge" href={site.playStoreUrl} aria-label="Get Penpus on Google Play">
        <PlayGlyph />
        <span className="lines">
          <span className="tiny">Get it on</span>
          <span className="big">Google Play</span>
        </span>
      </a>
      {withBrowser && (
        <a className="browser-link" href={site.webAppUrl}>
          Continue in browser →
        </a>
      )}
    </div>
  );
}
