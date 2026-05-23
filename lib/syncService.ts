import { supabase } from './supabase';
import { useWorkoutStore, CompletedWorkout } from '../store/useWorkoutStore';
import NetInfo from '@react-native-community/netinfo';

/**
 * Advanced Offline Sync with Conflict Resolution
 * Strategy: Last-Write-Wins based on completed_at timestamp
 */

export const syncWorkouts = async () => {
  const state = useWorkoutStore.getState();
  let localWorkouts: CompletedWorkout[] = state.completedWorkouts;

  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    return { success: false, message: 'Offline - sync skipped' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: 'Not authenticated' };

    // === 1. Upload unsynced local workouts ===
    const unsynced = localWorkouts.filter(w => !w.synced);

    if (unsynced.length > 0) {
      const toInsert = unsynced.map(w => ({
        user_id: user.id,
        workout_id: w.id,
        title: w.title,
        completed_at: w.date,
        duration_minutes: w.duration,
        exercises_completed: w.exercisesCompleted,
      }));

      const { error } = await supabase
        .from('user_workouts')
        .upsert(toInsert, {
          onConflict: 'user_id,workout_id,completed_at',
          ignoreDuplicates: false,
        });

      if (error) throw error;

      // Mark uploaded ones as synced
      localWorkouts = localWorkouts.map(w =>
        unsynced.some(u => u.id === w.id && u.date === w.date)
          ? { ...w, synced: true }
          : w
      );
      useWorkoutStore.setState({ completedWorkouts: localWorkouts });
    }

    // === 2. Download from server ===
    const { data: serverData, error: fetchError } = await supabase
      .from('user_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (fetchError) throw fetchError;

    if (!serverData || serverData.length === 0) {
      const now = new Date().toISOString();
      useWorkoutStore.getState().setLastSynced(now);
      return { success: true, message: 'Sync complete (no server data)' };
    }

    // === 3. Conflict Resolution: Last-Write-Wins by completed_at ===
    const serverWorkouts: CompletedWorkout[] = serverData.map(sw => ({
      id: sw.workout_id,
      title: sw.title,
      date: sw.completed_at,
      duration: sw.duration_minutes || 0,
      exercisesCompleted: sw.exercises_completed || 0,
      synced: true,
    }));

    const merged: CompletedWorkout[] = [];
    const localMap = new Map(
      localWorkouts.map(w => [`${w.id}-${w.date}`, w])
    );

    // Add all server workouts
    for (const serverW of serverWorkouts) {
      const key = `${serverW.id}-${serverW.date}`;
      const localW = localMap.get(key);

      if (!localW) {
        // New from server
        merged.push(serverW);
      } else {
        // Conflict: compare timestamps
        const serverTime = new Date(serverW.date).getTime();
        const localTime = new Date(localW.date).getTime();

        if (serverTime >= localTime) {
          // Server is newer or equal → keep server version
          merged.push(serverW);
        } else {
          // Local is newer → keep local (will be uploaded next time)
          merged.push({ ...localW, synced: false });
        }
      }
    }

    // Add local workouts that don't exist on server yet
    for (const localW of localWorkouts) {
      const key = `${localW.id}-${localW.date}`;
      const existsOnServer = serverWorkouts.some(sw => `${sw.id}-${sw.date}` === key);

      if (!existsOnServer) {
        merged.push({ ...localW, synced: false });
      }
    }

    // Sort by date (newest first)
    merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const now = new Date().toISOString();
    useWorkoutStore.setState({ completedWorkouts: merged, lastSynced: now });

    return { success: true, message: `Synced ${merged.length} workouts` };
  } catch (error: any) {
    console.error('Sync failed:', error);
    return { success: false, message: error.message };
  }
};

export const setupAutoSync = () => {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      syncWorkouts();
    }
  });
};