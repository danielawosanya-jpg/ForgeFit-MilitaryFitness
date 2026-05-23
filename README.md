# 🛡️ ForgeFit – Military Style Fitness App

**ForgeFit** is a complete, production-ready military-inspired fitness application. Train with discipline. Build unbreakable grit. Results that last.

## ✅ Features

- **4 Bottom Tabs**: Home • Missions • History • Profile
- **Live Workout Timer** with tap-to-complete exercises
- **Persistent History** saved locally + synced to cloud
- **Offline Sync** with intelligent conflict resolution (Last-Write-Wins)
- **Visual Sync Status** indicator with pending count
- **Supabase Authentication** (Login / Sign Up)
- **5 Military Workouts** including Rucking and 12-Week Bootcamp Week 1
- **Stripe Subscription** ready (just add your Payment Link)
- **Professional Dark Tactical UI** with gold accents

## Tech Stack

- React Native + Expo Router
- TypeScript + NativeWind (Tailwind)
- Zustand + AsyncStorage (persistent state)
- Supabase (Auth + Database)

## Getting Started

### Recommended Local Folder

Clone the repo into a folder named `forgefit`:

```bash
git clone https://github.com/danielawosanya-jpg/ForgeFit-MilitaryFitness.git forgefit
cd forgefit
```

See `SETUP.md` for the full recommended folder structure and quick start commands.

### Quick Start

```bash
npm install

# Add icons to assets/
# Create .env with your Supabase keys

npx expo start
```

## Production Build

```bash
eas build --platform all --profile production
```

See `LAUNCH_CHECKLIST.md` for the complete launch process.

## Built With Grit

**ForgeFit v2.1** — Created by Daniel with Grok

---

*"Pain is temporary. Pride is forever."*