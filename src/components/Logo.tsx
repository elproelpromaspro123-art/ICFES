"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Prepárate ICFES logo"
      role="img"
    >
      {/* Graduation cap top (diamond) */}
      <polygon points="32,10 56,24 32,38 8,24" fill="#003b71" />
      {/* Cap brim depth */}
      <polygon points="32,38 56,24 56,27 32,41 8,27 8,24" fill="#002550" />
      {/* Tassel cord */}
      <line
        x1="50"
        y1="21"
        x2="54"
        y2="35"
        stroke="#f9a825"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Tassel end */}
      <rect x="51" y="35" width="6" height="4" rx="1.5" fill="#f9a825" />
      <line
        x1="52"
        y1="39"
        x2="52"
        y2="43"
        stroke="#f9a825"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="54"
        y1="39"
        x2="54"
        y2="44"
        stroke="#f9a825"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="56"
        y1="39"
        x2="56"
        y2="42"
        stroke="#f9a825"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Sigma symbol on cap */}
      <text
        x="32"
        y="29"
        textAnchor="middle"
        fill="#f9a825"
        fontSize="13"
        fontWeight="bold"
        fontFamily="serif"
      >
        Σ
      </text>
      {/* Open book base */}
      <path
        d="M16,44 Q24,42 32,46 Q40,42 48,44 L48,54 Q40,52 32,56 Q24,52 16,54 Z"
        fill="#003b71"
        opacity="0.25"
      />
      <path d="M32,46 L32,56" stroke="#f9a825" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
