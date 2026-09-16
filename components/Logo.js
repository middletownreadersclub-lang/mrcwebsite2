// Vector recreation of the MRC emblem. Replace the paths with your original
// vector artwork when you have it — nothing else needs to change.

export function Emblem({ className = "", navy = "#16294A", brass = "#C2A04A" }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      role="img"
      aria-label="Middletown Readers Club emblem"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* the arc */}
      <path
        d="M20 124 A80 80 0 0 1 180 124"
        fill="none"
        stroke={navy}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* outer readers */}
      <circle cx="64" cy="76" r="12" fill={brass} />
      <path
        d="M64 92c12 0 20 12 22 26H42c2-14 10-26 22-26Z"
        fill={brass}
      />
      <circle cx="136" cy="76" r="12" fill={brass} />
      <path
        d="M136 92c12 0 20 12 22 26h-44c2-14 10-26 22-26Z"
        fill={brass}
      />

      {/* centre reader */}
      <circle cx="100" cy="57" r="14" fill={navy} />
      <path
        d="M100 76c14 0 24 14 26 36H74c2-22 12-36 26-36Z"
        fill={navy}
      />

      {/* open book */}
      <path
        d="M14 108c28-12 58-10 84 5v17c-26-15-56-17-84-5v-17Z"
        fill={navy}
      />
      <path
        d="M186 108c-28-12-58-10-84 5v17c26-15 56-17 84-5v-17Z"
        fill={navy}
      />
      <path
        d="M24 116c24-9 50-7 73 4"
        fill="none"
        stroke={brass}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M176 116c-24-9-50-7-73 4"
        fill="none"
        stroke={brass}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M100 113v18"
        stroke={navy}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ light = false }) {
  return (
    <span className="flex items-center gap-3">
      <Emblem
        className="h-9 w-auto shrink-0"
        navy={light ? "#F7F3EA" : "#16294A"}
        brass="#C2A04A"
      />
      <span className="leading-none">
        <span
          className={`block font-display text-xl tracking-wide ${
            light ? "text-parchment" : "text-navy"
          }`}
        >
          MRC
        </span>
        <span
          className={`block text-[0.62rem] tracking-[0.22em] ${
            light ? "text-brass-light" : "text-brass-deep"
          }`}
        >
          MIDDLETOWN READERS
        </span>
      </span>
    </span>
  );
}
