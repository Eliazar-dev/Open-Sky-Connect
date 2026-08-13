interface LogoProps {
  /** Size of the icon mark in pixels */
  size?: number;
  /** Show the "OpenSky Connect" wordmark next to the icon */
  showWordmark?: boolean;
  /** Render wordmark/icon in white (for dark backgrounds like the admin sidebar) */
  variant?: 'default' | 'light';
  className?: string;
}

/**
 * OpenSky Connect brand mark: three curved Wi-Fi arcs + wordmark.
 * Rebuilt as SVG (not a raster image) so it stays crisp at every size
 * and can be recolored for dark surfaces (e.g. the admin sidebar).
 */
export function Logo({ size = 28, showWordmark = true, variant = 'default', className = '' }: LogoProps) {
  const arcColor = variant === 'light' ? '#ffffff' : undefined;
  const inkColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const connectColor = variant === 'light' ? 'text-white/70' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="oscArc" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={arcColor ?? '#5aade4'} />
            <stop offset="100%" stopColor={arcColor ?? '#8bc9ef'} />
          </linearGradient>
        </defs>
        <path
          d="M6 20C6 20 20 6 42 6"
          stroke="url(#oscArc)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={variant === 'light' ? 0.55 : 0.55}
        />
        <path
          d="M6 30C6 30 22 14 38 14"
          stroke="url(#oscArc)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={variant === 'light' ? 0.8 : 0.8}
        />
        <path
          d="M6 40C6 40 22 24 34 24"
          stroke="url(#oscArc)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="6" cy="40" r="4" fill={arcColor ?? '#3690d6'} />
      </svg>
      {showWordmark && (
        <span className="leading-none whitespace-nowrap">
          <span className={`font-bold ${inkColor}`} style={{ fontSize: size * 0.62 }}>
            OpenSky
          </span>{' '}
          <span className={`font-normal ${connectColor}`} style={{ fontSize: size * 0.62 }}>
            Connect
          </span>
        </span>
      )}
    </div>
  );
}
