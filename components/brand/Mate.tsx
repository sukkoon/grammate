export type Mood = "wink" | "happy" | "thinking" | "listening" | "oops" | "cheer";

const coral = { stroke: "var(--coral)" } as const;
const coralFill = { fill: "var(--coral)" } as const;

function Face({ mood }: { mood: Mood }) {
  switch (mood) {
    case "happy":
      return (
        <>
          <path d="M20.5 26 Q24 22 27.5 26" stroke="currentColor" strokeWidth="3.4" />
          <path d="M30.5 26 Q34 22 37.5 26" style={coral} strokeWidth="3.4" />
        </>
      );
    case "thinking":
      return (
        <>
          <circle cx="24" cy="24.5" r="2.8" fill="currentColor" stroke="none" />
          <circle cx="34" cy="24.5" r="2.8" fill="currentColor" stroke="none" />
          <circle cx="56" cy="12" r="3.2" style={coralFill} stroke="none" />
          <circle cx="60.5" cy="5.5" r="2" style={coralFill} stroke="none" />
        </>
      );
    case "listening":
      return (
        <>
          <circle cx="24" cy="25.5" r="2.8" fill="currentColor" stroke="none" />
          <circle cx="34" cy="25.5" r="2.8" fill="currentColor" stroke="none" />
          <path d="M55 13.5 Q58.5 18.5 55 23.5" style={coral} strokeWidth="3" />
          <path d="M59.5 9.5 Q64 18.5 59.5 27.5" style={coral} strokeWidth="3" />
        </>
      );
    case "oops":
      return (
        <>
          <path d="M20.5 25.5 H26.5" stroke="currentColor" strokeWidth="3.2" />
          <path d="M30.5 25.5 H36.5" stroke="currentColor" strokeWidth="3.2" />
          <path d="M10 3 Q15 10 10 13 Q5 10 10 3 Z" style={coralFill} stroke="none" />
        </>
      );
    case "cheer":
      return (
        <>
          <path d="M20.5 26 Q24 22 27.5 26" stroke="currentColor" strokeWidth="3.4" />
          <path d="M30.5 26 Q34 22 37.5 26" style={coral} strokeWidth="3.4" />
          <path
            d="M56 3 L57.7 9.3 L64 11 L57.7 12.7 L56 19 L54.3 12.7 L48 11 L54.3 9.3 Z"
            style={coralFill}
            stroke="none"
          />
        </>
      );
    default:
      return (
        <>
          <circle cx="24" cy="25" r="3.2" fill="currentColor" stroke="none" />
          <path d="M30 25.5 Q33.5 21.5 37 25.5" style={coral} strokeWidth="3.6" />
        </>
      );
  }
}

/** 그래메이트 짝꿍: 윙크하는 G. 표정(mood)을 바꿔 사이트 곳곳의 이모지로 쓴다. */
export function Mate({
  mood = "wink",
  size = 40,
  className,
  title,
}: {
  mood?: Mood;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* 가로획(입)은 표정과 겹치지 않게 조금 낮고 짧게: 작은 크기에서도 G가 한 덩어리로 보인다 */}
      <path d="M48.5 16.5 A21 21 0 1 0 53 34 H42" stroke="currentColor" strokeWidth="7" />
      <Face mood={mood} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap font-extrabold tracking-[-0.035em] ${className}`}>
      gram<span className="text-coral">mate</span>
    </span>
  );
}

export function Logo({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-2 text-ink ${className}`}>
      <Mate size={size} />
      <Wordmark className="text-[1.45rem] leading-none" />
    </span>
  );
}
