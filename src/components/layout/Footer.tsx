import { Leaf } from "lucide-react";

export default function Footer() {
  return (
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
          <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
