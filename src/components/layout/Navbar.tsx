"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowRight, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  variant?: "public" | "app";
}

export default function Navbar({ variant = "public" }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-obsidian/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-teal flex items-center justify-center shadow-lg shadow-brand-emerald/20 transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 text-brand-obsidian" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono">
            EcoTwin<span className="text-brand-teal">.ai</span>
          </span>
        </Link>

        {/* Public Nav Links */}
        {variant === "public" && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="/#meet-twin" className="hover:text-brand-emerald transition-colors">Meet the Twin</a>
            <a href="/#features" className="hover:text-brand-emerald transition-colors">Features</a>
            <a href="/#how-it-works" className="hover:text-brand-emerald transition-colors">How It Works</a>
            <a href="/#tech" className="hover:text-brand-emerald transition-colors">Google Stack</a>
          </nav>
        )}

        {/* App Nav Links */}
        {variant === "app" && user && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link
              href="/dashboard"
              className={`hover:text-brand-emerald transition-colors ${pathname === "/dashboard" ? "text-brand-emerald" : ""}`}
            >
              My Twin
            </Link>
          </nav>
        )}

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {user && variant === "app" ? (
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoURL} alt={user.displayName ?? "User"} className="w-6 h-6 rounded-full" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="hidden sm:inline font-mono text-xs">{user.displayName?.split(" ")[0]}</span>
              </div>
              <button
                onClick={signOutUser}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:border-brand-emerald/40 transition-all text-sm font-mono flex items-center gap-2"
            >
              Launch App <ArrowRight className="w-4 h-4 text-brand-teal" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
