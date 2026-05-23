export interface Exercise {
  name: string;
  reps: string;
  sets: number;
}

export interface Workout {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  exercises: Exercise[];
}

export const workouts: Workout[] = [
  {
    id: 'daily-grinder',
    title: 'Daily Grinder',
    level: 'beginner',
    duration: 30,
    description: 'Classic military bootcamp circuit. No equipment needed. Build the foundation of a warrior.',
    exercises: [
      { name: 'Push-ups', reps: 'Max reps', sets: 4 },
      { name: 'Air Squats', reps: '20 reps', sets: 4 },
      { name: 'Burpees', reps: '10 reps', sets: 4 },
      { name: 'Plank Hold', reps: '45 seconds', sets: 3 },
      { name: 'Mountain Climbers', reps: '30 seconds', sets: 4 },
      { name: 'High Knees', reps: '30 seconds', sets: 4 },
    ],
  },
  {
    id: 'tactical-circuit',
    title: 'Tactical Circuit',
    level: 'intermediate',
    duration: 45,
    description: 'High-intensity functional training inspired by special forces selection. Push your limits.',
    exercises: [
      { name: 'Pull-ups / Inverted Rows', reps: 'Max reps', sets: 4 },
      { name: 'Hand-Release Push-ups', reps: '12 reps', sets: 4 },
      { name: 'Jump Squats', reps: '15 reps', sets: 4 },
      { name: 'Lunges (each leg)', reps: '12 reps', sets: 4 },
      { name: 'Burpees', reps: '8 reps', sets: 4 },
      { name: 'Plank to Push-up', reps: '10 reps', sets: 3 },
      { name: 'Flutter Kicks', reps: '30 seconds', sets: 3 },
    ],
  },
  {
    id: 'elite-beast',
    title: 'Elite Beast Mode',
    level: 'advanced',
    duration: 60,
    description: 'The ultimate test. For those who have already forged their body. No mercy. Pure execution.',
    exercises: [
      { name: 'Pull-ups', reps: 'Max reps', sets: 5 },
      { name: 'Diamond Push-ups', reps: '15 reps', sets: 5 },
      { name: 'Pistol Squats (assisted)', reps: '8 each leg', sets: 4 },
      { name: 'Muscle-ups (or progressions)', reps: 'Max reps', sets: 4 },
      { name: 'Burpee Pull-ups', reps: '8 reps', sets: 4 },
      { name: 'Hanging Leg Raises', reps: '12 reps', sets: 4 },
      { name: 'Plank', reps: '90 seconds', sets: 3 },
    ],
  },
];