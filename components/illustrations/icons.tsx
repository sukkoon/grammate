/** 그림에 쓰는 작은 아이콘들. 색은 currentColor를 따른다. */

export function CatIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M8 16 L10 4 L17.5 11 H22.5 L30 4 L32 16 A12.5 11.5 0 1 1 8 16 Z" fill="currentColor" />
      <circle cx="15" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
      <circle cx="25" cy="21.5" r="1.9" style={{ fill: "var(--card)" }} />
      <path d="M18 26 Q20 27.6 22 26" fill="none" strokeWidth="1.6" strokeLinecap="round" style={{ stroke: "var(--card)" }} />
    </svg>
  );
}

export function CrownIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 17.5 L4.6 7 L9.5 11.5 L12 4.5 L14.5 11.5 L19.4 7 L21 17.5 Z" fill="currentColor" />
      <rect x="3" y="18.8" width="18" height="2.4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function MaskIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M1.5 9 Q12 4.5 22.5 9 Q22.8 15.5 17.2 16.3 Q13.8 16.6 12 13.4 Q10.2 16.6 6.8 16.3 Q1.2 15.5 1.5 9 Z"
        fill="currentColor"
      />
      <ellipse cx="7.4" cy="11.2" rx="2.3" ry="1.6" style={{ fill: "var(--card)" }} />
      <ellipse cx="16.6" cy="11.2" rx="2.3" ry="1.6" style={{ fill: "var(--card)" }} />
    </svg>
  );
}

export function HatIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6.5 16.5 C6.5 9 8.5 6 12 6 C15.5 6 17.5 9 17.5 16.5 Z" fill="currentColor" />
      <rect x="2.5" y="16" width="19" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function PersonIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="7.5" r="4" fill="currentColor" />
      <path d="M4 21.5 C4 15.5 7.5 13 12 13 C16.5 13 20 15.5 20 21.5 Z" fill="currentColor" />
    </svg>
  );
}

export function BoxIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z" fill="currentColor" />
      <path d="M3 7.5 L12 12 L21 7.5 M12 12 V21" fill="none" strokeWidth="1.4" style={{ stroke: "var(--card)" }} />
    </svg>
  );
}

export function SunIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </svg>
  );
}

export function ClockIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function RoadIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M8 21 L10.5 3 M16 21 L13.5 3" />
      <path d="M12 6v2M12 11v2M12 16v2" />
    </svg>
  );
}

export function CalendarIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function MoonIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowRight({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
