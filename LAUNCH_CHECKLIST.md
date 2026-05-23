# ForgeFit Launch Checklist

## Pre-Launch

- [ ] Add the three icon files to `assets/` folder (see README)
- [ ] Create Supabase project and run SQL from `SUPABASE_SETUP.md`
- [ ] Add your Supabase URL and anon key to `.env`
- [ ] Replace Stripe placeholder URL in `app/subscription.tsx` with your real Payment Link
- [ ] Update `app.json` with your real `eas.projectId` (after running `eas build:configure`)
- [ ] Test the full flow: Login → Complete workout → Sync → History

## Build

- [ ] Run `eas build --platform all --profile production`
- [ ] Download and test the builds on real devices

## App Store Submission

- [ ] Create Apple Developer account + App Store Connect app
- [ ] Create Google Play Console app
- [ ] Run `eas submit --platform ios`
- [ ] Run `eas submit --platform android`
- [ ] Fill in store descriptions, screenshots, and privacy policy

## Post-Launch

- [ ] Monitor Supabase usage and errors
- [ ] Set up Stripe webhooks if needed
- [ ] Add more workouts based on user feedback

**You're ready to launch a high-quality military fitness app.**