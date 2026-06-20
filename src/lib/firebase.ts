import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBACwdw9axHm3B6GqgkYzfRDThZB8AvJTU",
  authDomain: "ecotwin-ai-d3b4a.firebaseapp.com",
  projectId: "ecotwin-ai-d3b4a",
  storageBucket: "ecotwin-ai-d3b4a.firebasestorage.app",
  messagingSenderId: "919964058025",
  appId: "1:919964058025:web:257bda0dd3a57d5d7d44b8"
};

// Prevent duplicate app initialization during Next.js hot reloads
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Request additional profile scopes
googleProvider.addScope("profile");
googleProvider.addScope("email");
