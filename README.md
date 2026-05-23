# 🛡️ ForgeFit - Military Style Fitness App

**ForgeFit** is a premium military-inspired fitness application built for everyone who wants to train like a soldier. Discipline. Grit. Results.

## Features (MVP Roadmap)

- 💪 Military-style workouts (bootcamp circuits, calisthenics, HIIT, rucking)
- 📅 Daily/Weekly structured programs
- 📊 Progress tracking & personal records
- 💳 Subscription model (Free + Premium)
- 🎥 Exercise video demos (placeholders)
- 🏆 Challenges & leaderboards
- 🔒 Secure auth + payments (Supabase + Stripe)

## Tech Stack

- React Native + Expo
- TypeScript
- NativeWind (Tailwind CSS)
- Zustand (state management)
- Supabase (auth, database, realtime)
- Stripe (subscriptions)

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI / Expo Go app

### Installation

```bash
# Clone the repo
git clone https://github.com/danielawosanya-jpg/ForgeFit-MilitaryFitness.git
cd ForgeFit-MilitaryFitness

# Install dependencies
npm install

# Start the app
npx expo start
```

### Run on Device
1. Install **Expo Go** on your phone
2. Scan the QR code from terminal

## Project Structure

```
ForgeFit/
├── app/                 # Expo Router screens
├── components/          # Reusable UI components
├── constants/           # Theme, colors, military ranks
├── data/                # Workout database
├── hooks/               # Custom hooks
├── utils/               # Helpers
├── assets/
├── package.json
├── app.json
└── README.md
```

## Subscription Tiers

| Tier     | Price          | Features                          |
|----------|----------------|-----------------------------------|
| Free     | $0             | Basic workouts, limited tracking  |
| Premium  | $9.99/mo or $79/yr | Full programs, progress, challenges, video library |

## Military Workout Philosophy

Train like the armed forces:
- High volume bodyweight
- Functional strength
- Mental toughness
- Progressive overload
- No excuses

## Roadmap

- [ ] Authentication (Supabase)
- [ ] Workout logging & history
- [ ] Subscription integration (Stripe)
- [ ] Leaderboards
- [ ] Ruck marching tracker
- [ ] Nutrition integration

## Contributing

Pull requests welcome! This is an open project to help people get fit with military discipline.

**Built with grit by Daniel & Grok**

---

*"Pain is temporary. Pride is forever."*