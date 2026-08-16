export function GeometricPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-foreground"
      style={{ opacity: "var(--pattern-opacity)" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="girih-pattern"
          x="0"
          y="0"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <path d="M36 4 L52 20 L52 52 L36 68 L20 52 L20 20 Z" />
            <path d="M36 4 L36 68 M4 36 L68 36" />
            <path d="M20 20 L52 52 M52 20 L20 52" />
            <circle cx="36" cy="36" r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girih-pattern)" />
    </svg>
  )
}