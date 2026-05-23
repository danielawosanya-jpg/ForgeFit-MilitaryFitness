import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { workouts } from '../../data/workouts';

export default function WorkoutsScreen() {
  return (
    <ScrollView className="flex-1 bg-[#0a0f14]">
      <View className="p-6">
        <Text className="text-white text-3xl font-bold mb-2 tracking-widest">MISSION BRIEFING</Text>
        <Text className="text-[#a0aec0] mb-8">Choose your battle today</Text>

        {workouts.map((workout, index) => (
          <Link key={index} href={`/workout/${workout.id}`} asChild>
            <Pressable className="bg-[#121a24] mb-4 rounded-3xl p-6 border border-[#c5a46e]/20 active:bg-[#1a2533]">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-[#c5a46e] text-sm tracking-[2px] mb-1">{workout.level.toUpperCase()}</Text>
                  <Text className="text-white text-2xl font-bold mb-2">{workout.title}</Text>
                  <Text className="text-[#a0aec0]">{workout.duration} min • {workout.exercises.length} exercises</Text>
                </View>
                <View className="bg-[#c5a46e] px-4 py-1 rounded-full self-start">
                  <Text className="text-[#0a0f14] font-bold text-xs tracking-widest">START</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}