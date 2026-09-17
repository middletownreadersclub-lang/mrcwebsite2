import Image from "next/image";

// ---------------------------------------------------------------------------
// Photo
//
// Wraps a photo in the club's navy/brass duotone. When no `src` is set in
// content/site.js, it draws a bookshelf instead — deliberate artwork, not a
// grey box waiting for a file.
//
// Note: this component never sets its own `position`. The caller decides,
// which is what stops the fallback from breaking out of its layer.
// ---------------------------------------------------------------------------

function seededRandom(seed) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildShelf(seed, width, top, bottom) {
  const rnd = seededRandom(seed + 7);
  const books = [];
  let x = -18;

  while (x < width + 18) {
    const w = 13 + Math.round(rnd() * 26);
    const h = Math.round((bottom - top) * (0.52 + rnd() * 0.46));
    const lean = rnd() > 0.92;
    books.push({ x, w, h, lean, tint: rnd(), band: rnd() > 0.55 });
    x += w + 2 + Math.round(rnd() * 3);
  }
  return books;
}

export function Shelf({ className = "", seed = 1, tone = "navy" }) {
  const dark = tone !== "parchment";
  const ground = dark ? "#0D1B33" : "#EFE7D6";
  const glow = dark ? "#1B3357" : "#F7F3EA";
  const shelfLine = dark ? "#C2A04A" : "#9A7C2E";

  const palette = dark
    ? ["#23406E", "#1B3357", "#2E4F80", "#C2A04A", "#35507F", "#9A7C2E", "#E8E0CE"]
    : ["#16294A", "#23406E", "#C2A04A", "#1B3357", "#9A7C2E", "#2E4F80", "#FFFFFF"];

  const rows = [
    { top: 40, bottom: 268 },
    { top: 320, bottom: 548 },
  ];

  const id = `shelf-${tone}-${seed}`;

  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="30%" cy="18%" r="95%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={ground} />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ground} stopOpacity="0" />
          <stop offset="100%" stopColor={ground} stopOpacity={dark ? "0.85" : "0.5"} />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-g)`} />

      {rows.map((row, r) => {
        const books = buildShelf(seed * (r + 3), 800, row.top, row.bottom);
        return (
          <g key={r}>
            {books.map((b, i) => {
              const y = row.bottom - b.h;
              const fill = palette[Math.floor(b.tint * palette.length)];
              return (
                <g
                  key={i}
                  transform={
                    b.lean ? `rotate(6 ${b.x + b.w / 2} ${row.bottom})` : undefined
                  }
                >
                  <rect
                    x={b.x}
                    y={y}
                    width={b.w}
                    height={b.h}
                    rx="1.5"
                    fill={fill}
                    opacity={dark ? 0.9 : 0.82}
                  />
                  {b.band && (
                    <>
                      <rect
                        x={b.x + 2}
                        y={y + b.h * 0.16}
                        width={Math.max(b.w - 4, 3)}
                        height="2.5"
                        fill={dark ? "#C2A04A" : "#9A7C2E"}
                        opacity="0.75"
                      />
                      <rect
                        x={b.x + 2}
                        y={y + b.h * 0.24}
                        width={Math.max(b.w - 4, 3)}
                        height="1.5"
                        fill={dark ? "#C2A04A" : "#9A7C2E"}
                        opacity="0.45"
                      />
                    </>
                  )}
                </g>
              );
            })}
            <rect
              x="0"
              y={row.bottom}
              width="800"
              height="3"
              fill={shelfLine}
              opacity="0.55"
            />
          </g>
        );
      })}

      <rect width="800" height="600" fill={`url(#${id}-fade)`} />
    </svg>
  );
}

export default function Photo({
  src,
  alt = "",
  seed = 1,
  tone = "navy",
  duotone = true,
  priority = false,
  className = "",
  sizes = "100vw",
}) {
  if (!src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <Shelf className="h-full w-full" seed={seed} tone={tone} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
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
    </div>
  );
}
