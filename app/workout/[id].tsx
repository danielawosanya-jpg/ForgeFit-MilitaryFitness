import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { workouts } from '../../data/workouts';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutDetail() {
  const { id } = useLocalSearchParams();
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return <Text className="text-white p-6">Workout not found</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#0a0f14]">
      <View className="p-6">
        <Text className="text-[#c5a46e] text-sm tracking-[3px]">{workout.level.toUpperCase()} MISSION</Text>
        <Text className="text-white text-4xl font-bold mt-1 mb-2">{workout.title}</Text>
        <Text className="text-[#a0aec0] text-lg mb-8">{workout.duration} minutes of pure grit</Text>

        <View className="bg-[#121a24] rounded-3xl p-6 mb-8">
          <Text className="text-white text-xl font-bold mb-4">BRIEFING</Text>
          <Text className="text-[#a0aec0] leading-relaxed">{workout.description}</Text>
        </View>

        <Text className="text-white text-xl font-bold mb-4 tracking-widest">EXERCISES</Text>
        {workout.exercises.map((ex, idx) => (
          <View key={idx} className="bg-[#121a24] mb-3 rounded-2xl p-5 flex-row items-center border border-[#c5a46e]/10">
            <View className="w-10 h-10 bg-[#c5a46e] rounded-full items-center justify-center mr-4">
              <Text className="text-[#0a0f14] font-bold">{idx + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">{ex.name}</Text>
              <Text className="text-[#a0aec0]">{ex.reps} • {ex.sets} sets</Text>
            </View>
            <Ionicons name="play-circle" size={32} color="#c5a46e" />
          </View>
        ))}

        <Pressable className="bg-[#c5a46e] mt-8 py-5 rounded-2xl active:opacity-90">
          <Text className="text-[#0a0f14] text-center text-xl font-extrabold tracking-[3px]">BEGIN MISSION →</Text>
        </Pressable>

        <Text className="text-center text-[#4a5568] mt-6 text-xs tracking-widest">NO EXCUSES. EXECUTE.</Text>
      </View>
    </ScrollView>
  );
}