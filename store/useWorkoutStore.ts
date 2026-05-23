import { create } from 'zustand';

interface WorkoutStore {
  completedWorkouts: string[];
  addCompletedWorkout: (workoutId: string) => void;
  streak: number;
  incrementStreak: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  completedWorkouts: [],
  streak: 12,
  addCompletedWorkout: (workoutId) =>
    set((state) => ({
      completedWorkouts: [...state.completedWorkouts, workoutId],
    })),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
}));