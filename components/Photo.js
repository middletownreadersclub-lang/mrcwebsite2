import Image from "next/image";

// ---------------------------------------------------------------------------
// Photo
//
// Wraps any photo in the club's navy/brass duotone so stock photography stops
// looking like stock photography and starts looking like the brand. If no
// `src` is set in content/site.js, it falls back to a generated atmosphere
// panel so nothing ever renders as an empty grey box.
//
// Drop your files in /public/images and set the path in content/site.js.
// ---------------------------------------------------------------------------

export function Atmosphere({ className = "", seed = 0, tone = "navy" }) {
  const id = `atm-${tone}-${seed}`;
  const base = tone === "navy" ? "#0D1B33" : "#F7F3EA";
  const glow = tone === "navy" ? "#23406E" : "#EFE7D6";

  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="35%" cy="25%" r="85%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={base} />
        </radialGradient>
        <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-bg)`} />

      <g filter={`url(#${id}-blur)`} opacity="0.55">
        <circle cx={140 + seed * 37} cy="150" r="90" fill="#C2A04A" opacity="0.55" />
        <circle cx={640 - seed * 23} cy="120" r="64" fill="#D9BE78" opacity="0.4" />
        <circle cx={300 + seed * 19} cy="470" r="120" fill="#23406E" opacity="0.6" />
        <circle cx={700 - seed * 31} cy="430" r="80" fill="#C2A04A" opacity="0.28" />
        <circle cx={480} cy={260 + seed * 11} r="58" fill="#D9BE78" opacity="0.22" />
      </g>
    </svg>
  );
}

export default function Photo({
  src,
  alt = "",
  seed = 0,
  tone = "navy",
  duotone = true,
  priority = false,
  className = "",
  sizes = "100vw",
}) {
  if (!src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Atmosphere className="h-full w-full" seed={seed} tone={tone} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${duotone ? "opacity-90" : ""}`}
      />
      {duotone && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-navy-deep/70 mix-blend-color"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/25 to-brass/10"
          />
        </>
      )}
    </div>
  );
}
