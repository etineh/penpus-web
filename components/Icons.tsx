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
