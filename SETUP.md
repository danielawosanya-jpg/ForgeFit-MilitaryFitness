# ForgeFit Local Setup

## Recommended Folder Structure

After cloning, your local project should look like this:

```
forgefit/
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── workouts.tsx
│   │   ├── history.tsx
│   │   └── profile.tsx
│   ├── workout/
│   │   ├── [id].tsx
│   │   └── active/
│   │       └── [id].tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── subscription.tsx
├── data/
│   └── workouts.ts
├── lib/
│   ├── supabase.ts
│   └── syncService.ts
├── store/
│   └── useWorkoutStore.ts
├── .env
├── app.json
├── eas.json
├── package.json
├── README.md
├── SUPABASE_SETUP.md
├── LAUNCH_CHECKLIST.md
└── SETUP.md
```

## Quick Start

```bash
git clone https://github.com/danielawosanya-jpg/ForgeFit-MilitaryFitness.git forgefit
cd forgefit
npm install

# Add your icons to assets/
# Add your Supabase keys to .env

npx expo start
```

## Next Steps

See `LAUNCH_CHECKLIST.md` for production build and store submission steps.