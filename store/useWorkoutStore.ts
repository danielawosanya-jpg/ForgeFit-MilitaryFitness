import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CompletedWorkout {
  id: string;
  title: string;
  date: string;
  duration: number;
  exercisesCompleted: number;
  synced?: boolean;
}

interface WorkoutStore {
  completedWorkouts: CompletedWorkout[];
  streak: number;
  lastSynced: string | null;
  addCompletedWorkout: (workout: CompletedWorkout) => void;
  incrementStreak: () => void;
  resetProgress: () => void;
  markAsSynced: (workoutId: string, date: string) => void;
  setLastSynced: (timestamp: string) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      completedWorkouts: [],
      streak: 12,
      lastSynced: null,
      addCompletedWorkout: (workout) =>
        set((state) => ({
          completedWorkouts: [{ ...workout, synced: false }, ...state.completedWorkouts],
        })),
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
      resetProgress: () => set({ completedWorkouts: [], streak: 0 }),
      markAsSynced: (workoutId, date) =>
        set((state) => ({
          completedWorkouts: state.completedWorkouts.map(w =>
            w.id === workoutId && w.date === date ? { ...w, synced: true } : w
          ),
        })),
      setLastSynced: (timestamp) => set({ lastSynced: timestamp }),
    }),
    {
      name: 'forgefit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);