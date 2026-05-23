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

### 1. Clone the repo
```bash
git clone https://github.com/danielawosanya-jpg/ForgeFit-MilitaryFitness.git
cd ForgeFit-MilitaryFitness
npm install
```

### 2. Add the Icons
Place the three generated icon files in the `assets/` folder:
- `icon.png`
- `splash-icon.png`
- `adaptive-icon.png`

### 3. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL from `SUPABASE_SETUP.md`
3. Create a `.env` file:
```env
EXPO_PUBLIC_SUPABASE_URL=your-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key
```
4. Install packages:
```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill @react-native-community/netinfo
```

### 4. Run the app
```bash
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