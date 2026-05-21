// src/App.jsx — Root component with page state management
import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import Home         from "./pages/Home";
import ExercisePage from "./pages/ExercisePage";
import DailyRoutine from "./pages/DailyRoutine";
import HomeWorkout  from "./pages/HomeWorkout";
import GymPage      from "./pages/GymPage";
import Premium      from "./pages/Premium";
import Progress     from "./pages/Progress";

export default function App() {
  const [page, setPage]         = useState("home");
  const [bodyPart, setBodyPart] = useState("neck");

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.08 }
      );
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 120);
    return () => clearTimeout(timer);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":         return <Home setPage={setPage} setBodyPart={setBodyPart} />;
      case "exercises":    return <ExercisePage bodyPart={bodyPart} setPage={setPage} />;
      case "routine":      return <DailyRoutine />;
      case "home-workout": return <HomeWorkout />;
      case "gym":          return <GymPage />;
      case "premium":      return <Premium />;
      case "progress":     return <Progress setPage={setPage} />;
      default:             return <Home setPage={setPage} setBodyPart={setBodyPart} />;
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <Navbar page={page} setPage={setPage} />
      <main style={{ flex:1 }}>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
