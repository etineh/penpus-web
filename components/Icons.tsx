// Shared inline SVGs. The nib is the Penpus mark (pen + campus → a fountain nib).

export function Nib({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 L18 9 C18 9 16.5 16 12 18 C7.5 16 6 9 6 9 Z" fill="var(--pen)" />
      <circle cx="12" cy="10.5" r="1.7" fill="var(--paper)" />
      <path d="M12 12.2 V18" stroke="var(--paper)" strokeWidth="1.3" />
      <path d="M10 19.5 h4 L12 22.5 Z" fill="var(--pen)" />
    </svg>
  );
}

export function Verified({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M12 2 15 5.5 19.5 6 19 10.5 22 14 19 17.5 19.5 22 15 21.5 12 24 9 21.5 4.5 22 5 17.5 2 14 5 10.5 4.5 6 9 5.5Z"
        opacity=".25"
      />
      <path d="M10.6 15.4 7.6 12.4 9 11 10.6 12.6 15 8.2 16.4 9.6Z" />
    </svg>
  );
}

export function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="13.5" r="8" fill="#fff" />
      <circle cx="16.5" cy="10.5" r="4.5" fill="#101418" />
      <circle cx="13.5" cy="12.5" r="4.2" fill="#fff" />
      <path d="M12 6.2 C12 4.4 13.4 3 15 3 C15 4.8 13.6 6.2 12 6.2 Z" fill="#fff" />
    </svg>
  );
}

export function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.5 L15.5 12 L5 20.5 Z" fill="#34A853" />
      <path d="M15.5 12 L18.8 9.4 L21 12 L18.8 14.6 Z" fill="#FBBC04" />
      <path d="M5 3.5 L13 10.2 L15.5 12 L5 20.5 Z" fill="#4285F4" opacity=".55" />
    </svg>
  );
}

// Social glyphs — single-colour, inherit currentColor.
export function XGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.2L1 2h7l4.9 6.5L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  );
}

export function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2 1.5 3.4 3.5 3.6v2.5c-1.3 0-2.5-.4-3.5-1.1v5.6c0 3.2-2.4 5.5-5.4 5.5A5.3 5.3 0 0 1 5.6 13c0-3 2.4-5.3 5.5-5.3.3 0 .6 0 .9.06v2.6a2.9 2.9 0 0 0-.9-.15 2.8 2.8 0 1 0 2.8 2.8V3h2.6Z" />
    </svg>
  );
}

export function LinkedInGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5ZM3 9.5h4V21H3zM10 9.5h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.3-1.94 2.65V21h-4z" />
    </svg>
  );
}
