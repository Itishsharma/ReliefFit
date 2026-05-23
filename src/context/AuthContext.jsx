// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(undefined); // undefined = still loading
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // 1. Check if we just came back from a redirect login
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) setUser(result.user);
      })
      .catch((err) => {
        console.error("Redirect result error:", err);
      });

    // 2. Keep watching auth state (handles refresh, logout, etc.)
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Try popup first → if blocked/fails, fall back to redirect
  const loginWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      // popup_blocked_by_browser, cancelled, cross-origin issues
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request" ||
        err.code === "auth/internal-error"
      ) {
        // Fall back to full-page redirect (always works)
        await signInWithRedirect(auth, provider);
      } else {
        setError(err.message);
        console.error("Login error:", err);
      }
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);