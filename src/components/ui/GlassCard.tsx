import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  accentColor?: "emerald" | "teal" | "amber" | "none";
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = false,
  accentColor = "none",
}: GlassCardProps) {
  const accentBorderMap = {
    emerald: "border-brand-emerald/15",
    teal: "border-brand-teal/15",
    amber: "border-brand-amber/15",
    none: "border-white/8",
  };

  return (
    <div
      className={`
        glass-panel rounded-3xl
        ${accentBorderMap[accentColor]}
        ${hoverEffect ? "glass-panel-hover" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
