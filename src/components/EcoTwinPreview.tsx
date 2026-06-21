"use client";

import { useState } from "react";
import Confetti from "react-confetti";

interface EcoTwinPreviewProps {
  interactive?: boolean;
  initialScore?: number;
}

export default function EcoTwinPreview({
  interactive = true,
  initialScore = 750,
}: EcoTwinPreviewProps) {
  const [score, setScore] = useState(initialScore);

  // Derive visual states based on score
  const getTwinState = (currentScore: number) => {
    if (currentScore < 300) {
      return {
        label: "Withered & Dusty",
        description: "Your carbon shadow is heavy. Air is hazy, and the ecosystem is struggling.",
        primaryColor: "#FF5E62", // Rose warning red
        secondaryColor: "#FF9966", // Orange warning
        faceExpression: (
          <path
            d="M 38 52 Q 50 42 62 52" // Sad mouth
            fill="none"
            stroke="#f3f6fa"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ),
        particleColor: "#FF5E62",
        particleCount: 2,
        moodClass: "text-red-400",
        eyes: (
          <>
            {/* Sad/droopy eyes */}
            <path d="M 32 38 L 44 42" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 56 42 L 68 38" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
          </>
        ),
        pulseSpeed: "1.2s",
        glowOpacity: 0.15,
      };
    } else if (currentScore < 600) {
      return {
        label: "Dormant Seedling",
        description: "Ecosystem is stable but inactive. Add conscious habits to prompt growth.",
        primaryColor: "#FFB300", // Amber
        secondaryColor: "#FFD54F", // Yellow
        faceExpression: (
          <path
            d="M 40 48 L 60 48" // Flat mouth
            fill="none"
            stroke="#f3f6fa"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ),
        particleColor: "#FFB300",
        particleCount: 4,
        moodClass: "text-amber-400",
        eyes: (
          <>
            {/* Neutral straight eyes */}
            <line x1="32" y1="40" x2="44" y2="40" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
            <line x1="56" y1="40" x2="68" y2="40" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
          </>
        ),
        pulseSpeed: "3s",
        glowOpacity: 0.3,
      };
    } else if (currentScore < 850) {
      return {
        label: "Growing Sprout",
        description: "Your twin is healthy, breathing clean air, and generating active foliage.",
        primaryColor: "#05FF99", // Emerald
        secondaryColor: "#00E5FF", // Teal
        faceExpression: (
          <path
            d="M 38 46 Q 50 56 62 46" // Happy mouth
            fill="none"
            stroke="#f3f6fa"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ),
        particleColor: "#05FF99",
        particleCount: 6,
        moodClass: "text-brand-emerald",
        eyes: (
          <>
            {/* Happy curved eyes */}
            <path d="M 32 40 Q 38 34 44 40" fill="none" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 56 40 Q 62 34 68 40" fill="none" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
          </>
        ),
        pulseSpeed: "4.5s",
        glowOpacity: 0.6,
      };
    } else {
      return {
        label: "Thriving Biosphere",
        description: "Optimal balance achieved! Golden sparks float around a fully matured eco-canopy.",
        primaryColor: "#05FF99", // Emerald
        secondaryColor: "#FFD700", // Gold
        faceExpression: (
          <path
            d="M 36 44 Q 50 58 64 44" // Big happy smile
            fill="none"
            stroke="#f3f6fa"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ),
        particleColor: "#FFD700",
        particleCount: 10,
        moodClass: "text-yellow-400 font-semibold",
        eyes: (
          <>
            {/* Twinkling/excited eyes */}
            <path d="M 30 40 L 36 34 L 42 40" fill="none" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 40 L 64 34 L 70 40" fill="none" stroke="#f3f6fa" strokeWidth="3" strokeLinecap="round" />
          </>
        ),
        pulseSpeed: "6s",
        glowOpacity: 0.85,
      };
    }
  };

  const stateInfo = getTwinState(score);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Glassmorphic Container for Twin */}
      <div className="w-full max-w-sm aspect-square glass-panel rounded-3xl p-8 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl transition-all duration-500">
        {score >= 850 && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-4xl animate-pulse z-20">
            ✨✨✨
          </div>
        )}

        {score >= 850 && (
          <div className="absolute top-4 right-4 z-20 text-yellow-400 text-2xl animate-bounce">
            👑
          </div>
        )}

        {score >= 850 && (
          <Confetti recycle={false} />
        )}
        
        {/* Soft Background Glow */}
        <div
          className="absolute inset-0 w-full h-full opacity-30 blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${stateInfo.primaryColor} 0%, transparent 60%)`,
          }}
        />

        {/* Top Header Badge */}
        <div className="z-10 bg-brand-obsidian/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-xs text-slate-400 font-mono tracking-widest uppercase">
          Score: <span className={stateInfo.moodClass}>{score}</span> / 1000
        </div>

        {/* The SVG Creature */}
        <div
          className="w-48 h-48 z-10 relative flex items-center justify-center"
          style={{
            animation: `breath ${stateInfo.pulseSpeed} ease-in-out infinite`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(5,255,153,0.15)]"
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={stateInfo.primaryColor} />
                <stop offset="100%" stopColor={stateInfo.secondaryColor} />
              </linearGradient>
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor={stateInfo.primaryColor} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Floating ambient particles (inside SVG context) */}
            {Array.from({ length: stateInfo.particleCount }).map((_, index) => {
              const delay = index * 0.7;
              const size = 1.5 + (index % 3);
              const cx = 15 + (index * 73) % 70;
              const cy = 20 + (index * 47) % 30;
              return (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={size}
                  fill={stateInfo.particleColor}
                  className="animate-pulse"
                  style={{
                    animationDelay: `${delay}s`,
                    animationDuration: "2s",
                  }}
                  opacity="0.6"
                />
              );
            })}

            {/* Base roots / connections */}
            <path
              d="M 30 75 Q 50 85 70 75 M 40 78 Q 50 90 60 78"
              fill="none"
              stroke={stateInfo.primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Main Terrarium Dome Outline */}
            <circle
              cx="50"
              cy="48"
              r="38"
              fill="rgba(18, 24, 32, 0.5)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />

            {/* The Living Core (Creature Body) */}
            <path
              d="M 28 55 C 28 35, 72 35, 72 55 C 72 70, 28 70, 28 55 Z"
              fill="url(#bodyGradient)"
              className="transition-all duration-700"
            />

            {/* Eyes */}
            {stateInfo.eyes}

            {/* Mouth expression */}
            {stateInfo.faceExpression}

            {/* Glowing cheeks */}
            <circle cx="28" cy="48" r="4" fill="url(#eyeGlow)" opacity="0.4" />
            <circle cx="72" cy="48" r="4" fill="url(#eyeGlow)" opacity="0.4" />

            {/* Head sprout / leaf */}
            <path
              d="M 50 36 Q 42 22 50 14 Q 58 22 50 36"
              fill={stateInfo.primaryColor}
              opacity="0.9"
              className="origin-bottom transition-all duration-700"
            />
          </svg>
        </div>

        {/* Status Label */}
        <div className="z-10 text-center w-full mt-2">
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase transition-colors duration-500">
            {stateInfo.label}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-8 px-4 leading-relaxed font-sans">
            {stateInfo.description}
          </p>
        </div>
      </div>

      {/* Interactive Footprint Slider (if enabled) */}
      {interactive && (
        <div className="w-full max-w-sm mt-8 px-4 flex flex-col items-center">
          <div className="flex justify-between w-full text-xs font-mono text-slate-400 mb-2">
            <span>High Footprint (Unhealthy)</span>
            <span>Zero Carbon (Optimal)</span>
          </div>
          <input
            type="range"
            min="100"
            max="950"
            step="10"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
          />
          <span className="text-[10px] text-slate-500 mt-3 font-mono">
            ← Slide to preview twin state responses →
          </span>
        </div>
      )}
    </div>
  );
}
