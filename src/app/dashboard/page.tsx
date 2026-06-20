"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Leaf, TrendingUp, Sparkles } from "lucide-react";
import EcoTwinPreview from "@/components/EcoTwinPreview";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui/GlassCard";

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [futureBoost, setFutureBoost] = useState(100);

  useEffect(() => {
    const data = localStorage.getItem("ecotwin-profile");

    if (!data) {
      router.replace("/onboarding");
      return;
    }

    setProfile(JSON.parse(data));
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!profile) return;

    let current = 0;

    const interval = setInterval(() => {
      current += 10;

      if (current >= profile.twin.score) {
        current = profile.twin.score;
        clearInterval(interval);
      }

      setAnimatedScore(current);
    }, 20);

    return () => clearInterval(interval);
  }, [profile]);

  // Loading spinner while auth resolves
  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-emerald animate-spin" />
      </div>
    );
  }

  const twin = profile.twin;


  const firstName = "Explorer";
  const ecoMessage =
    twin.score >= 700
      ? "🌳 Amazing! Your lifestyle is helping the planet thrive."
      : twin.score >= 400
      ? "🌱 You're making good progress. Small changes can create a big impact."
      : "🍃 Your EcoTwin believes you can become greener with a few lifestyle changes.";
  
  const ecoTips = [
  "💡 Turn off lights when leaving a room.",
  "🚲 Try cycling once a week instead of driving.",
  "🌿 Reduce food waste by planning meals.",
  "♻️ Recycle paper, plastic, and glass whenever possible.",
  "🚿 Taking shorter showers saves water and energy.",
  ];

  const dailyTip =
    ecoTips[new Date().getDate() % ecoTips.length];
  
  const badge =
    twin.score >= 700
      ? "🥇 Carbon Hero"
      : twin.score >= 400
      ? "🥈 Green Traveler"
      : "🥉 Eco Explorer";

  const planetStatus =
    twin.score >= 700
      ? "🌍 Planet Guardian"
      : twin.score >= 400
      ? "🌱 Eco Learner"
      : "⚠️ Carbon Beginner";

  const statusMessage =
    twin.score >= 700
      ? "You're among the greenest citizens of Earth."
      : twin.score >= 400
      ? "You're on your journey toward sustainability."
      : "Small lifestyle changes can make a huge difference.";  
  
  const streak = Math.floor(twin.score / 100) + 1;

  const quotes = [
    "🌎 The Earth is what we all have in common.",
    "♻️ Small acts, when multiplied, can transform the world.",
    "🌱 Every day is Earth Day.",
    "🌳 The greatest threat to our planet is believing someone else will save it.",
    "💚 Sustainability begins with you."
  ];

  const dailyQuote =
    quotes[new Date().getDate() % quotes.length];

  const diaryEntry =
  twin.score >= 700
    ? "Dear diary, today my human made choices that helped the Earth breathe a little easier. I feel stronger and greener than ever!"
    : twin.score >= 400
    ? "Dear diary, we're making progress together. Every small eco-friendly action helps me grow."
    : "Dear diary, I know my human can do even better. I'm excited to see the greener choices we'll make tomorrow!";

  const earthHealth = Math.min(
    Math.floor(twin.score / 10),
    100
  );

  const achievements = [];

  if (twin.score >= 300)
    achievements.push("🌱 Eco Beginner");

  if (twin.score >= 500)
    achievements.push("🚲 Green Commuter");

  if (twin.score >= 700)
    achievements.push("🌳 Planet Guardian");

  if (twin.score >= 900)
    achievements.push("👑 Earth Champion");

  return (
    
    <div className="min-h-screen bg-brand-obsidian flex flex-col text-slate-100">
      <Navbar variant="app" />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">

        {/* Welcome header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-teal uppercase tracking-widest mb-2">
            <Leaf className="w-3.5 h-3.5" /> Dashboard
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-brand-emerald">{firstName}</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-sans">
            Here's your EcoTwin's current ecological status.
          </p>
        </div>

        {/* 3-Column Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <GlassCard className="p-5" accentColor="emerald">
            <div className="text-xs font-mono text-slate-400 uppercase mb-2">
              Planet Status
            </div>

            <div className="text-2xl font-bold text-brand-emerald">
              {planetStatus}
            </div>

            <p className="text-sm text-slate-400 mt-3">
              {statusMessage}
            </p>
          </GlassCard>

          <GlassCard className="p-5" accentColor="teal">
            <div className="text-xs font-mono text-slate-400 uppercase mb-2">
              Eco Streak
            </div>

            <div className="text-4xl font-bold">
              🔥 {streak}
            </div>

            <p className="text-sm text-slate-400 mt-3">
              Consecutive eco-friendly days.
            </p>
          </GlassCard>

          <GlassCard className="p-5" accentColor="emerald">
            <div className="text-xs font-mono text-slate-400 uppercase mb-2">
              Motivation
            </div>

            <p className="text-sm text-slate-300 italic">
              {dailyQuote}
            </p>
          </GlassCard>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Twin Visualizer */}
          <div className="lg:col-span-4">
            <EcoTwinPreview interactive={false} initialScore={twin.score} />
          </div>

          {/* Middle: Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Score card */}
            <GlassCard className="p-6" accentColor="emerald">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">EcoTwin Score</span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-full border border-brand-emerald/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {twin.stage.charAt(0).toUpperCase() + twin.stage.slice(1)}
                </div>
              </div>
              <div className="text-5xl font-bold text-white font-mono mb-1">
                {animatedScore}
                <span className="text-lg text-slate-500 font-normal"> / 1000</span>
              </div>
              {/* Score bar */}
              <div className="w-full h-2 bg-white/5 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-emerald to-brand-teal rounded-full transition-all duration-700"
                  style={{ width: `${animatedScore / 10}%` }}
                />
              </div>
              <div className="mt-4 text-center">
                <span className="px-4 py-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-sm">
                  {badge}
                </span>
              </div>

            </GlassCard>

            {/* Onboarding summary */}
            <GlassCard className="p-6" accentColor="teal">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">Your Profile</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl mb-1">
                    {profile.onboarding?.diet === "vegan" ? "🌱" : profile.onboarding?.diet === "vegetarian" ? "🥗" : profile.onboarding?.diet === "heavy_meat" ? "🥩" : "🍽️"}
                  </div>
                  <div className="text-xs text-slate-400 font-mono capitalize">{(profile.onboarding?.diet ?? "—").replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-xl mb-1">
                    {profile.onboarding?.commute === "walk_cycle" ? "🚴" : profile.onboarding?.commute === "transit" ? "🚌" : profile.onboarding?.commute === "frequent_flights" ? "✈️" : "🚗"}
                  </div>
                  <div className="text-xs text-slate-400 font-mono capitalize">{(profile.onboarding?.commute ?? "—").replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-xl mb-1">
                    {profile.onboarding?.home === "small_apartment" ? "🏢" : profile.onboarding?.home === "shared_house" ? "🏠" : "🏡"}
                  </div>
                  <div className="text-xs text-slate-400 font-mono capitalize">{(profile.onboarding?.home ?? "—").replace("_", " ")}</div>
                </div>
              </div>
            </GlassCard>
          </div>
          <GlassCard className="p-6 mb-6" accentColor="emerald">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Message from Your EcoTwin
            </div>

            <p className="text-slate-200 text-sm leading-relaxed">
              {ecoMessage}
            </p>
          </GlassCard>

          <GlassCard className="p-6 mb-6" accentColor="teal">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Daily Eco Tip
            </div>

            <p className="text-slate-200 text-sm">
              {dailyTip}
            </p>
          </GlassCard>
          <GlassCard className="p-6 mb-6" accentColor="teal">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
             Earth Health Meter
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                style={{ width: `${earthHealth}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Your choices currently restore Earth's health by {earthHealth}%.
            </p>
          </GlassCard>
          <GlassCard className="p-6 mb-6" accentColor="emerald">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Achievements
            </div>

            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <span
                  key={achievement}
                  className="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-sm"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Right: Coming soon features */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <GlassCard className="p-5 flex-1" hoverEffect>
              <h3 className="text-sm font-bold text-white font-mono mb-3">
                🌱 Sentient Diary
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{diaryEntry}"
              </p>
            </GlassCard>

            <GlassCard className="p-5 flex-1" hoverEffect>
              <h3 className="text-sm font-bold text-white font-mono mb-3">
                🔮 Future Simulator
              </h3>

              <p className="text-xs text-slate-400 mb-4">
                Simulate greener habits:
              </p>

              <input
                type="range"
                min="0"
                max="300"
                step="50"
                value={futureBoost}
                onChange={(e) => setFutureBoost(Number(e.target.value))}
                className="w-full"
  
              />

              <div className="text-3xl font-bold text-brand-emerald mt-4">
                {Math.min(twin.score + futureBoost, 1000)}
              </div>

              <p className="text-xs text-slate-500 mt-2">
                projected eco score
              </p>

            </GlassCard>
          </div>

        </div>
      </main>
    </div>
  );
}
