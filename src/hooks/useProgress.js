// src/hooks/useProgress.js
// All Firestore read/write logic for progress tracking
// Used by Progress.jsx — keeps the page clean

import { useState, useEffect } from "react";
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function useProgress() {
  const { user } = useAuth();
  const [log,     setLog]     = useState({});   // { "2025-01-15": ["Neck Stretches", ...] }
  const [syncing, setSyncing] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  // ── Load log from Firestore when user logs in ──
  useEffect(() => {
    if (!user) {
      // Not logged in — fall back to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("rf_log") || "{}");
        setLog(saved);
      } catch { setLog({}); }
      setLoaded(true);
      return;
    }

    const ref = doc(db, "users", user.uid);
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        setLog(snap.data().log || {});
      } else {
        // First time user — create their doc
        setDoc(ref, {
          displayName: user.displayName,
          email:       user.email,
          photoURL:    user.photoURL,
          log:         {},
          createdAt:   serverTimestamp(),
        });
      }
      setLoaded(true);
    });
  }, [user]);

  // ── Save a day's exercises ──
  const saveDay = async (dateStr, exercises) => {
    const updated = { ...log, [dateStr]: exercises };
    setLog(updated);

    if (user) {
      setSyncing(true);
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { log: updated }).catch(() =>
        setDoc(ref, { log: updated }, { merge: true })
      );
      setSyncing(false);
    } else {
      // Save to localStorage if not logged in
      localStorage.setItem("rf_log", JSON.stringify(updated));
    }
  };

  // ── Compute streak from log ──
  const getStreak = () => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (!log[key] || log[key].length === 0) {
        if (i === 0) continue; // today not yet logged — don't break streak
        break;
      }
      streak++;
    }
    return streak;
  };

  return { log, saveDay, getStreak, syncing, loaded };
}
