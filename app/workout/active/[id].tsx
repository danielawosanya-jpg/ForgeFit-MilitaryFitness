import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { workouts } from '../../../data/workouts';
import { useWorkoutStore } from '../../../store/useWorkoutStore';
import { Ionicons } from '@expo/vector-icons';

export default function ActiveWorkout() {
  const { id } = useLocalSearchParams();
  const workout = workouts.find(w => w.id === id);
  const { addCompletedWorkout, incrementStreak } = useWorkoutStore();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExercise = (index: number) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(completedExercises.filter(i => i !== index));
    } else {
      setCompletedExercises([...completedExercises, index]);
    }
  };

  const finishWorkout = () => {
    if (workout) {
      addCompletedWorkout(workout.id);
      if (completedExercises.length > 3) {
        incrementStreak();
      }
    }
    Alert.alert(
      'Mission Complete!',
      `Great work, warrior! You completed ${completedExercises.length} exercises.`,
      [{ text: 'RETURN TO BASE', onPress: () => router.push('/workouts') }]
    );
  };

  if (!workout) return <Text className="text-white p-6">Workout not found</Text>;

  return (
    <View className="flex-1 bg-[#0a0f14]">
      {/* Timer Header */}
      <View className="bg-[#121a24] p-6 pt-14 border-b border-[#c5a46e]/20">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-[#c5a46e] text-sm tracking-[2px]">{workout.level.toUpperCase()}</Text>
            <Text className="text-white text-2xl font-bold">{workout.title}</Text>
          </View>
          <View className="items-end">
            <Text className="text-[#c5a46e] text-xs tracking-widest">ELAPSED</Text>
            <Text className="text-white text-4xl font-mono font-bold tracking-[3px]">{formatTime(time)}</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mt-6">
          <Pressable 
            onPress={() => setIsRunning(!isRunning)}
            className={`flex-1 py-4 rounded-2xl flex-row items-center justify-center ${isRunning ? 'bg-red-600' : 'bg-[#c5a46e]'}`}
          >
            <Ionicons name={isRunning ? "pause" : "play"} size={22} color={isRunning ? "white" : "#0a0f14"} />
            <Text className={`ml-2 text-lg font-bold tracking-widest ${isRunning ? 'text-white' : 'text-[#0a0f14]'}`}>
              {isRunning ? 'PAUSE MISSION' : 'START TIMER'}
            </Text>
          </Pressable>

          <Pressable onPress={finishWorkout} className="bg-[#121a24] border border-[#c5a46e] px-6 py-4 rounded-2xl">
            <Text className="text-[#c5a46e] font-bold tracking-widest">FINISH</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="text-white text-xl font-bold mb-4 tracking-widest">EXECUTE THE MISSION</Text>
        
        {workout.exercises.map((ex, idx) => {
          const isDone = completedExercises.includes(idx);
          return (
            <Pressable 
              key={idx} 
              onPress={() => toggleExercise(idx)}
              className={`mb-3 rounded-2xl p-5 flex-row items-center border ${isDone ? 'bg-[#1a3a2a] border-[#4ade80]' : 'bg-[#121a24] border-[#c5a46e]/20'}`}
            >
              <View className={`w-9 h-9 rounded-full items-center justify-center mr-4 ${isDone ? 'bg-[#4ade80]' : 'bg-[#c5a46e]'}`}>
                {isDone ? (
                  <Ionicons name="checkmark" size={20} color="#0a0f14" />
                ) : (
                  <Text className="text-[#0a0f14] font-bold">{idx + 1}</Text>
                )}
              </View>
              <View className="flex-1">
                <Text className={`text-lg font-semibold ${isDone ? 'text-[#4ade80] line-through' : 'text-white'}`}>{ex.name}</Text>
                <Text className="text-[#a0aec0]">{ex.reps} • {ex.sets} sets</Text>
              </View>
              <Ionicons 
                name={isDone ? "checkbox" : "square-outline"} 
                size={28} 
                color={isDone ? "#4ade80" : "#c5a46e"} 
              />
            </Pressable>
          );
        })}

        <View className="h-20" />
      </ScrollView>

      <View className="p-6 bg-[#121a24] border-t border-[#c5a46e]/20">
        <Text className="text-center text-[#4a5568] text-xs tracking-[2px]">MARK EACH EXERCISE COMPLETE AS YOU EXECUTE</Text>
      </View>
    </View>
  );
}