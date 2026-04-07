import React from "react";

const AvengersGlyph = ({ size = 22 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" stroke="rgba(247,195,95,0.9)" strokeWidth="2" />
      <circle cx="20" cy="20" r="13" stroke="rgba(64,167,255,0.75)" strokeWidth="1.5" />
      <path
        d="M10 28L18 10h4l8 18h-4l-1.5-3.8h-9L14 28h-4zm7-7h6l-3-7-3 7z"
        fill="url(#ag)"
      />
      <defs>
        <linearGradient id="ag" x1="10" y1="10" x2="31" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7c35f" />
          <stop offset="0.5" stopColor="#e63946" />
          <stop offset="1" stopColor="#40a7ff" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AvengersGlyph;
