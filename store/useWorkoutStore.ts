import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CompletedWorkout {
  id: string;
  title: string;
  date: string;
  duration: number;
  exercisesCompleted: number;
}

interface WorkoutStore {
  completedWorkouts: CompletedWorkout[];
  streak: number;
  addCompletedWorkout: (workout: CompletedWorkout) => void;
  incrementStreak: () => void;
  resetProgress: () => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      completedWorkouts: [],
      streak: 12,
      addCompletedWorkout: (workout) =>
        set((state) => ({
          completedWorkouts: [workout, ...state.completedWorkouts],
        })),
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
      resetProgress: () => set({ completedWorkouts: [], streak: 0 }),
    }),
    {
      name: 'forgefit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);