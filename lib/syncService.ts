import { supabase } from './supabase';
import { useWorkoutStore } from '../store/useWorkoutStore';
import NetInfo from '@react-native-community/netinfo';

// This service handles offline-first sync for workout history

export const syncWorkouts = async () => {
  const state = useWorkoutStore.getState();
  const localWorkouts = state.completedWorkouts;

  // Check internet connection
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    console.log('Offline - skipping sync');
    return { success: false, message: 'No internet connection' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    // 1. Upload unsynced local workouts
    const unsynced = localWorkouts.filter(w => !(w as any).synced);

    if (unsynced.length > 0) {
      const workoutsToInsert = unsynced.map(w => ({
        user_id: user.id,
        workout_id: w.id,
        title: w.title,
        completed_at: w.date,
        duration_minutes: w.duration,
        exercises_completed: w.exercisesCompleted,
      }));

      const { error } = await supabase
        .from('user_workouts')
        .upsert(workoutsToInsert, { onConflict: 'user_id,workout_id,completed_at' });

      if (error) throw error;

      // Mark as synced locally
      const updated = localWorkouts.map(w => 
        unsynced.find(u => u.id === w.id && u.date === w.date) 
          ? { ...w, synced: true } 
          : w
      );
      useWorkoutStore.setState({ completedWorkouts: updated });
    }

    // 2. Download latest from server
    const { data: serverWorkouts, error: fetchError } = await supabase
      .from('user_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (fetchError) throw fetchError;

    if (serverWorkouts) {
      // Simple merge strategy: keep local + add new server ones
      const serverMapped = serverWorkouts.map(sw => ({
        id: sw.workout_id,
        title: sw.title,
        date: sw.completed_at,
        duration: sw.duration_minutes,
        exercisesCompleted: sw.exercises_completed,
        synced: true,
      }));

      // Merge avoiding duplicates
      const existingIds = new Set(localWorkouts.map(w => `${w.id}-${w.date}`));
      const newFromServer = serverMapped.filter(sw => 
        !existingIds.has(`${sw.id}-${sw.date}`)
      );

      if (newFromServer.length > 0) {
        useWorkoutStore.setState({
          completedWorkouts: [...newFromServer, ...localWorkouts],
        });
      }
    }

    return { success: true, message: 'Sync completed' };
  } catch (error: any) {
    console.error('Sync error:', error);
    return { success: false, message: error.message };
  }
};

// Auto-sync when app comes online
export const setupAutoSync = () => {
  return NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncWorkouts();
    }
  });
};