# ReliefFit — Move. Recover. Thrive.

A full multi-page React + Framer Motion website for body pain relief.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```

---

## Project Structure

```
relieffit/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              ← React entry point
    ├── App.jsx               ← Root + page router
    ├── index.css             ← Global styles, CSS vars, animations
    │
    ├── pages/
    │   ├── Home.jsx          ← Hero + Features + Body Picker
    │   ├── ExercisePage.jsx  ← Exercises for selected body part
    │   ├── DailyRoutine.jsx  ← Age-wise routine + Indian veg meals
    │   ├── HomeWorkout.jsx   ← Equipment-free workouts by category
    │   ├── GymPage.jsx       ← Gym: Warmup→Push→Pull→Legs→Core
    │   ├── Premium.jsx       ← Pricing + Physio booking form
    │   └── Progress.jsx      ← Streak tracker + leagues + calendar
    │
    ├── components/
    │   ├── Navbar.jsx        ← Forma AI pill-style floating navbar
    │   ├── Footer.jsx        ← Short footer
    │   ├── HeroSection.jsx   ← CleverMellow-style hero (strips + mockup)
    │   ├── BodyPicker.jsx    ← 8 body part selector cards
    │   ├── ExerciseCard.jsx  ← Reusable exercise card with photo
    │   └── FeaturesStrip.jsx ← Animated ticker + stat cards
    │
    └── data/
        ├── exercises.js      ← Indian yoga + exercises per body part (7 each)
        ├── routine.js        ← Age-wise routines (Under 22 / 23-60 / 60+)
        ├── diet.js           ← Indian vegetarian meal plan
        ├── gym.js            ← Gym workouts by category
        └── homeWorkouts.js   ← Equipment-free workout library
```

---

## Features

| Feature | Description |
|---------|-------------|
| **Hero** | CleverMellow-style dark bg + vertical color strips + floating browser mockup + parallax scroll |
| **Navbar** | Forma AI floating pill navbar with BePro button |
| **Body Picker** | 8 body areas → opens targeted exercises |
| **Exercises** | 5-7 exercises/yoga per body part, Indian yoga included |
| **Daily Routine** | Age selector → Under 22 / Working (23-60) / Senior (60+) |
| **Indian Diet** | 100% vegetarian Indian meal plan (Khichdi, Dal, Sattu, etc.) |
| **Home Workout** | Tabbed: Full Body / Upper / Lower / Core |
| **Gym** | Warmup → Push / Pull / Legs / Core with filter tabs |
| **Progress** | Daily log, streak counter, 7 leagues (Bronze→Conqueror), monthly calendar, bar chart |
| **Premium** | Forma AI pricing cards + physio booking form with success message |
| **Animations** | Framer Motion throughout — page enter, scroll parallax, stagger, hover |

## Leagues System
| League | Streak Required |
|--------|----------------|
| 🥉 Bronze | 1 week |
| 🥈 Silver | 2 weeks |
| 🥇 Gold | 4 weeks |
| 💎 Platinum | 8 weeks |
| 👑 Crown | 16 weeks |
| ⚡ Ace | 32 weeks |
| 🏆 Conqueror | 64 weeks |

## Tech Stack
- **React 18** + Vite
- **Framer Motion** — all animations
- **CSS Variables** — no UI library
- **Unsplash** — exercise photos
- **Google Fonts** — Syne + DM Sans

## Coming Soon (Backend Integration)
- Gmail login via Google OAuth
- Progress sync across devices
- League leaderboards
- Physiotherapist booking backend
