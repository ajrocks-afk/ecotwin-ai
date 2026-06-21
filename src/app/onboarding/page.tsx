"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sanitizeInput } from "@/lib/sanitize";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import GlassCard from "@/components/ui/GlassCard";
import { Leaf, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type DietType = "vegan" | "vegetarian" | "omnivore" | "heavy_meat";
type CommuteType = "walk_cycle" | "transit" | "car" | "frequent_flights";
type HomeType = "small_apartment" | "shared_house" | "large_house";

interface OnboardingAnswers {
  diet: DietType | null;
  commute: CommuteType | null;
  home: HomeType | null;
}

// Non-nullable version used after all 3 steps are complete
interface CompletedAnswers {
  diet: DietType;
  commute: CommuteType;
  home: HomeType;
}

// ─── Score Calculation ──────────────────────────────────────────────────────
// Each category contributes up to 333 points. Lower carbon = higher score.

const DIET_SCORES: Record<DietType, number> = {
  vegan: 333,
  vegetarian: 280,
  omnivore: 180,
  heavy_meat: 80,
};

const COMMUTE_SCORES: Record<CommuteType, number> = {
  walk_cycle: 333,
  transit: 240,
  car: 120,
  frequent_flights: 50,
};

const HOME_SCORES: Record<HomeType, number> = {
  small_apartment: 333,
  shared_house: 220,
  large_house: 100,
};

function calculateInitialScore(answers: CompletedAnswers): number {
  const raw =
    DIET_SCORES[answers.diet] +
    COMMUTE_SCORES[answers.commute] +
    HOME_SCORES[answers.home];
  // Clamp to 0–1000
  return Math.min(1000, Math.max(0, raw));
}

function stageFromScore(score: number): "seed" | "sprout" | "sapling" | "tree" {
  if (score < 300) return "seed";
  if (score < 600) return "sprout";
  if (score < 850) return "sapling";
  return "tree";
}

// ─── Step Components ────────────────────────────────────────────────────────

interface OptionCardProps<T extends string> {
  value: T;
  label: string;
  icon: string;
  description: string;
  selected: boolean;
  onSelect: (v: T) => void;
}

function OptionCard<T extends string>({
  value, label, icon, description, selected, onSelect,
}: OptionCardProps<T>) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`
        w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all
        ${selected
          ? "bg-brand-emerald/10 border-brand-emerald/40 shadow-lg shadow-brand-emerald/10"
          : "bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15"
        }
      `}
    >
      <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
      <div>
        <div className={`text-sm font-semibold font-mono ${selected ? "text-brand-emerald" : "text-white"}`}>
          {label}
        </div>
        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed font-sans">{description}</div>
      </div>
      {selected && <CheckCircle2 className="w-4 h-4 text-brand-emerald ml-auto flex-shrink-0 mt-0.5" />}
    </button>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

const STEPS = ["Diet", "Commute", "Home"] as const;

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    diet: null,
    commute: null,
    home: null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const currentSelection =
    step === 0 ? answers.diet : step === 1 ? answers.commute : answers.home;

  const canAdvance = currentSelection !== null;

  const handleNext = async () => {
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }

    if (!answers.diet || !answers.commute || !answers.home)
      return;
    
    const score =
      DIET_SCORES[answers.diet] +
      COMMUTE_SCORES[answers.commute] +
      HOME_SCORES[answers.home];

    const profile = {
      onboarding: {
        diet: sanitizeInput(answers.diet),
        commute: sanitizeInput(answers.commute),
        home: sanitizeInput(answers.home),
      },
      twin: {
        score,
        stage: stageFromScore(score),
        name: "EcoBuddy",
      },
    };

    localStorage.setItem(
      "ecotwin-profile",
      JSON.stringify(profile)
    );

    router.push("/dashboard");
  };


  return (
    <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center px-4 relative">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-teal/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-emerald/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-teal flex items-center justify-center">
          <Leaf className="w-4.5 h-4.5 text-brand-obsidian" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-bold tracking-tight text-white font-mono">
          EcoTwin<span className="text-brand-teal">.ai</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= step ? "text-brand-emerald" : ""}>{s}</span>
          ))}
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-emerald to-brand-teal rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <GlassCard className="w-full max-w-md p-8 flex flex-col gap-6">

        {/* Step header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-brand-teal uppercase tracking-widest">
            Step {step + 1} of 3
          </div>
          <h2 className="text-xl font-bold text-white">
            {step === 0 && "What describes your diet?"}
            {step === 1 && "How do you usually commute?"}
            {step === 2 && "What's your home situation?"}
          </h2>
          <p className="text-sm text-slate-400 font-sans">
            This helps us compute your initial EcoTwin score.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {step === 0 && (
            <>
              <OptionCard value="vegan" label="Vegan" icon="🌱" description="Plant-based diet, no animal products." selected={answers.diet === "vegan"} onSelect={(v) => setAnswers((a) => ({ ...a, diet: v }))} />
              <OptionCard value="vegetarian" label="Vegetarian" icon="🥗" description="No meat, but may include dairy/eggs." selected={answers.diet === "vegetarian"} onSelect={(v) => setAnswers((a) => ({ ...a, diet: v }))} />
              <OptionCard value="omnivore" label="Omnivore" icon="🍽️" description="Mixed diet including occasional meat." selected={answers.diet === "omnivore"} onSelect={(v) => setAnswers((a) => ({ ...a, diet: v }))} />
              <OptionCard value="heavy_meat" label="Meat-heavy" icon="🥩" description="Meat is a major part of daily meals." selected={answers.diet === "heavy_meat"} onSelect={(v) => setAnswers((a) => ({ ...a, diet: v }))} />
            </>
          )}

          {step === 1 && (
            <>
              <OptionCard value="walk_cycle" label="Walk or Cycle" icon="🚴" description="Zero-emission daily commute." selected={answers.commute === "walk_cycle"} onSelect={(v) => setAnswers((a) => ({ ...a, commute: v }))} />
              <OptionCard value="transit" label="Public Transit" icon="🚌" description="Bus, metro, or train commuter." selected={answers.commute === "transit"} onSelect={(v) => setAnswers((a) => ({ ...a, commute: v }))} />
              <OptionCard value="car" label="Personal Car" icon="🚗" description="Daily driving for commutes or errands." selected={answers.commute === "car"} onSelect={(v) => setAnswers((a) => ({ ...a, commute: v }))} />
              <OptionCard value="frequent_flights" label="Frequent Flights" icon="✈️" description="Regular domestic or international travel." selected={answers.commute === "frequent_flights"} onSelect={(v) => setAnswers((a) => ({ ...a, commute: v }))} />
            </>
          )}

          {step === 2 && (
            <>
              <OptionCard value="small_apartment" label="Small Apartment" icon="🏢" description="Studio or 1-bedroom, often shared building energy." selected={answers.home === "small_apartment"} onSelect={(v) => setAnswers((a) => ({ ...a, home: v }))} />
              <OptionCard value="shared_house" label="Shared House" icon="🏠" description="Share a house or large flat with others." selected={answers.home === "shared_house"} onSelect={(v) => setAnswers((a) => ({ ...a, home: v }))} />
              <OptionCard value="large_house" label="Large Private Home" icon="🏡" description="Detached house with personal HVAC and garden." selected={answers.home === "large_house"} onSelect={(v) => setAnswers((a) => ({ ...a, home: v }))} />
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
            {error}
          </div>
        )}

        {/* Next / Finish button */}
        <button
          id="onboarding-next-btn"
          onClick={handleNext}
          disabled={!canAdvance || saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                     bg-gradient-to-r from-brand-emerald to-brand-teal
                     text-brand-obsidian font-semibold text-sm
                     transition-all hover:shadow-xl hover:shadow-brand-emerald/25 hover:scale-[1.01]
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {step < 2 ? "Next Step" : "Generate My Twin"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </GlassCard>

      {/* Step dots */}
      <div className="flex gap-2 mt-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-brand-emerald w-4" : i < step ? "bg-brand-emerald/40" : "bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
