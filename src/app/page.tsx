"use client";

import EcoTwinPreview from "@/components/EcoTwinPreview";
import {
  Leaf,
  Sparkles,
  BookOpen,
  Camera,
  MapPin,
  TrendingUp,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 bg-brand-obsidian min-h-screen relative text-slate-100 flex flex-col font-sans selection:bg-brand-emerald selection:text-brand-obsidian">
      
      {/* Decorative Top Glowing Blob */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-obsidian/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-teal flex items-center justify-center shadow-lg shadow-brand-emerald/20">
              <Leaf className="w-5 h-5 text-brand-obsidian" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              EcoTwin<span className="text-brand-teal">.ai</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#meet-twin" className="hover:text-brand-emerald transition-colors">Meet the Twin</a>
            <a href="#features" className="hover:text-brand-emerald transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-emerald transition-colors">How It Works</a>
            <a href="#tech" className="hover:text-brand-emerald transition-colors">Google Stack</a>
          </nav>

          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:border-brand-emerald/40 transition-all text-sm font-mono flex items-center gap-2"
          >
            Launch App <ArrowRight className="w-4 h-4 text-brand-teal" />
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Top Pill Accent */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Sustainability Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white max-w-2xl">
            Your Carbon Footprint <br />
            <span className="text-gradient-emerald">Has a Voice.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
            Meet EcoTwin, a living companion that grows with your sustainable choices. Replaces dry questionnaires with passive tracking and interactive empathy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-teal text-brand-obsidian font-semibold hover:shadow-xl hover:shadow-brand-emerald/25 transition-all text-center flex items-center justify-center gap-2 group"
            >
              Generate Your Twin <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:border-white/20 transition-all text-center"
            >
              Explore Features
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 w-full">
            <div>
              <div className="text-2xl font-bold text-white font-mono">100%</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">Passive Setup</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">3 Sec</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">Pantry Scan</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">4.8x</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">User Engagement</div>
            </div>
          </div>
        </div>

        {/* Hero Visualizer */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            <EcoTwinPreview interactive={false} initialScore={880} />
            
            {/* Absolute Badges for Wow-Factor */}
            <div className="absolute -top-6 -left-6 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 animate-float border border-brand-emerald/20 shadow-lg shadow-brand-emerald/10">
              <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-brand-emerald" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono">State</div>
                <div className="text-xs font-semibold text-white font-mono">Thriving</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 animate-float border border-brand-teal/20 shadow-lg shadow-brand-teal/10" style={{ animationDelay: "3s" }}>
              <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono">Weekly Save</div>
                <div className="text-xs font-semibold text-white font-mono">-14.2 kg CO2e</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MEET YOUR ECOTWIN --- */}
      <section id="meet-twin" className="bg-brand-slate/30 border-y border-white/5 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              An Ecosystem that Reacts to You
            </h2>
            <p className="text-slate-400">
              Your EcoTwin is an animated avatar powered by real daily decisions. Slide the controller below to preview how it communicates changes in air quality, soil vitality, and growth stages.
            </p>
          </div>

          <EcoTwinPreview interactive={true} initialScore={680} />

        </div>
      </section>

      {/* --- SECTION 3: FEATURES OVERVIEW --- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-teal">Features Blueprint</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Smarter Habits, Zero Friction
            </h2>
          </div>
          <p className="text-slate-400 max-w-md">
            Built using advanced vision models and intelligent mapping parameters to remove the standard manual overhead of carbon logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[320px] glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-brand-emerald" />
            </div>
            <div className="space-y-3 mt-12">
              <h3 className="text-lg font-bold text-white font-mono">The Sentient Diary</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                At the end of the day, Gemini takes your footprint data and generates a first-person journal entry written by your EcoTwin, reflecting its environmental health.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[320px] glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center">
              <Camera className="w-6 h-6 text-brand-teal" />
            </div>
            <div className="space-y-3 mt-12">
              <h3 className="text-lg font-bold text-white font-mono">Multimodal Pantry Scanner</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Take a quick photo of your fridge or pantry. Gemini instantly detects ingredients, estimates their food carbon footprints, and generates a zero-waste recipe.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[320px] glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-brand-amber" />
            </div>
            <div className="space-y-3 mt-12">
              <h3 className="text-lg font-bold text-white font-mono">Carbon Shadow Overlay</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Enter your commute options. Google Maps routes overlay real transit and driving comparisons so you can claim log credits instantly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: HOW IT WORKS --- */}
      <section id="how-it-works" className="bg-brand-slate/30 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Three Steps to Sync</h2>
            <p className="text-slate-400">
              No spreadsheets, no manual equations. A simple cyclical path to tracking and offset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-white/10 flex items-center justify-center text-xl font-bold text-brand-teal font-mono">
                1
              </div>
              <h3 className="text-lg font-semibold text-white font-mono">Onboard in 30s</h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-sans">
                Answer three simple sliding indicators to initialize your basic carbon twin avatar.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-white/10 flex items-center justify-center text-xl font-bold text-brand-emerald font-mono">
                2
              </div>
              <h3 className="text-lg font-semibold text-white font-mono">Upload Photo or Commute</h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-sans">
                Scan grocery receipts, snapshot your pantry, or search routes to log emissions passively.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-white/10 flex items-center justify-center text-xl font-bold text-brand-amber font-mono">
                3
              </div>
              <h3 className="text-lg font-semibold text-white font-mono">Grow & Adapt</h3>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-sans">
                Watch your Twin bloom, read its daily logs, and follow target missions to reduce footprint.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 5: GOOGLE TECH SHOWCASE --- */}
      <section id="tech" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">Ecosystem Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Powered by Google Cloud & AI
          </h2>
          <p className="text-slate-400 font-sans">
            Built using advanced, national hackathon-winning architectures connecting three core Google APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel rounded-3xl p-8 border border-brand-emerald/10">
            <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-brand-emerald" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono mb-3">Gemini 1.5 Flash</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
              Powers image analysis and JSON parsing for the pantry scanner and receipt reader, alongside creative voice-role generations for the daily journal entries.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-emerald">
              <CheckCircle2 className="w-4 h-4" /> Multi-modal Vision API
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-teal/10">
            <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-brand-teal" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono mb-3">Google Maps Routes</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
              Calculates routing coordinates and calculates absolute emission differentials between cars, public transit, walking, and cycling.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-teal">
              <CheckCircle2 className="w-4 h-4" /> Real-time Carbon Routing
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-amber/10">
            <div className="w-12 h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-brand-amber" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono mb-3">Firebase Suite</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
              Handles user profile storage, real-time Firestore database queries, Google Authentication, and cloud serverless hosting.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-amber">
              <CheckCircle2 className="w-4 h-4" /> Real-time NoSQL Firestore
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 6: CALL TO ACTION --- */}
      <section id="cta" className="max-w-5xl mx-auto px-6 pb-24 md:pb-32 w-full">
        <div className="glass-panel rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden border border-brand-emerald/15 shadow-2xl shadow-brand-emerald/5">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-brand-emerald/5 to-brand-teal/5 opacity-50 blur-xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Ready to Give Your <br />
              <span className="text-gradient-emerald">Footprint a Shape?</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Join the new era of personalized sustainability. Set up your digital twin in 30 seconds and connect with your local climate footprint in real time.
            </p>
            
            <div className="pt-6 flex justify-center">
              <Link
                href="/login"
                className="px-8 py-4 rounded-xl bg-white hover:bg-brand-emerald text-brand-obsidian font-semibold transition-all shadow-xl shadow-white/5 hover:shadow-brand-emerald/20 hover:scale-[1.02] flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-brand-obsidian py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-brand-emerald" />
            </div>
            <span>EcoTwin AI © 2026. All rights reserved.</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://github.com" className="hover:text-white transition-colors">Github</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
