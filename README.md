# 🛡️ ForgeFit - Military Style Fitness App

**ForgeFit** is a premium military-inspired fitness application built for everyone who wants to train like a soldier. Discipline. Grit. Results.

## ✅ Current Features (MVP v1.5)

- 💪 **Military-style workouts** (3 programs: Daily Grinder, Tactical Circuit, Elite Beast)
- ⏱️ **Live workout timer** + tap-to-complete exercises
- 🔐 **Authentication** (Supabase Login + Sign Up)
- 💳 **Subscription screen** (Premium upgrade UI)
- 🎨 Beautiful dark tactical military theme

## Tech Stack

- React Native + Expo (Expo Router)
- TypeScript
- NativeWind (Tailwind CSS)
- Supabase (Auth ready)
- Zustand (future state)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/danielawosanya-jpg/ForgeFit-MilitaryFitness.git
cd ForgeFit-MilitaryFitness
npm install
```

### 2. Supabase Setup (Required for Auth)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon public key**
3. Create `.env` file in the root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Install Supabase client:
```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

### 3. Run the App

```bash
npx expo start
```

Scan the QR with **Expo Go**.

## Project Structure

```
app/
├── index.tsx              # Home
├── login.tsx              # Login
├── signup.tsx             # Sign Up
├── workouts.tsx           # Mission Briefing
├── workout/[id].tsx       # Workout Detail
├── workout/active/[id].tsx # Live Timer + Completion
├── subscription.tsx       # Premium
lib/supabase.ts            # Supabase client
```

## Roadmap

- [x] Live workout timer + exercise completion
- [x] Supabase Authentication
- [ ] Workout history & progress saving
- [ ] Stripe subscription payments
- [ ] Profile & military rank system
- [ ] More workouts & challenges

**Built with grit by Daniel & Grok**

---

*"Pain is temporary. Pride is forever."*