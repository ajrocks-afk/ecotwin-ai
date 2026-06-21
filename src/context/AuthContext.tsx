"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  AuthError,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TwinState {
  name: string;
  score: number;       // 0–1000
  stage: "seed" | "sprout" | "sapling" | "tree";
  lastCalculated: Date | null;
}

export interface OnboardingAnswers {
  diet: "vegan" | "vegetarian" | "omnivore" | "heavy_meat" | null;
  commute: "walk_cycle" | "transit" | "car" | "frequent_flights" | null;
  home: "small_apartment" | "shared_house" | "large_house" | null;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: Date | null;
  onboardingComplete: boolean;
  onboarding?: OnboardingAnswers;
  twin: TwinState;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ─── Context ───────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helpers ───────────────────────────────────────────────────────────────

function stageFromScore(score: number): TwinState["stage"] {
  if (score < 300) return "seed";
  if (score < 600) return "sprout";
  if (score < 850) return "sapling";
  return "tree";
}

async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = snap.data() as any;
  return {
    ...data,
    createdAt: data.createdAt?.toDate() ?? null,
    twin: {
      ...data.twin,
      lastCalculated: data.twin?.lastCalculated?.toDate() ?? null,
    },
  } as UserProfile;
}

// ─── Provider ──────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Load profile whenever the user changes
  const loadProfile = useCallback(async (firebaseUser: User) => {
    const p = await fetchUserProfile(firebaseUser.uid);
    setProfile(p);
  }, []);

  useEffect(() => {
    console.log("AuthContext running");

    console.log("Loading set to false");
  }, []);

  // Sign in with Google popup
  const signInWithGoogle = async () => {
    console.log("Button clicked!");

    sessionStorage.setItem("loggedIn", "true");

    setUser({ uid: "demo-user" } as User);

    window.location.href = "/onboarding";
  };

  // Sign out
  const signOutUser = async () => {
    await signOut(auth);
    setProfile(null);
    router.push("/");
  };

  // Manually refresh profile from Firestore (used after onboarding write)
  const refreshProfile = async () => {
    if (user) await loadProfile(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, error, signInWithGoogle, signOutUser, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
