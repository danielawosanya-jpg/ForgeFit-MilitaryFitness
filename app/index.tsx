import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#0a0f14]">
      <View className="p-6 pt-12">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-5xl font-bold text-white tracking-widest">FORGEFIT</Text>
          <Text className="text-[#c5a46e] text-xl mt-1 tracking-[4px]">TRAIN LIKE A WARRIOR</Text>
        </View>

        {/* Hero */}
        <View className="bg-[#121a24] rounded-3xl p-8 mb-8 border border-[#c5a46e]/30">
          <Text className="text-white text-2xl font-bold mb-3">Welcome Back, Warrior</Text>
          <Text className="text-[#a0aec0] text-base leading-relaxed">
            Today is another opportunity to build unbreakable discipline.
            The mission continues.
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-[#121a24] rounded-2xl p-5 border border-[#c5a46e]/20">
            <Text className="text-[#c5a46e] text-sm tracking-widest">CURRENT STREAK</Text>
            <Text className="text-white text-4xl font-bold mt-1">12</Text>
            <Text className="text-[#a0aec0]">days</Text>
          </View>
          <View className="flex-1 bg-[#121a24] rounded-2xl p-5 border border-[#c5a46e]/20">
            <Text className="text-[#c5a46e] text-sm tracking-widest">WORKOUTS DONE</Text>
            <Text className="text-white text-4xl font-bold mt-1">87</Text>
            <Text className="text-[#a0aec0]">total</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <Link href="/workouts" asChild>
          <Pressable className="bg-[#c5a46e] py-4 rounded-2xl mb-4 active:opacity-90">
            <Text className="text-[#0a0f14] text-center text-xl font-bold tracking-widest">START TODAY'S MISSION</Text>
          </Pressable>
        </Link>

        <Link href="/subscription" asChild>
          <Pressable className="border border-[#c5a46e] py-4 rounded-2xl active:opacity-90">
            <Text className="text-[#c5a46e] text-center text-xl font-bold tracking-widest">UPGRADE TO PREMIUM</Text>
          </Pressable>
        </Link>

        <View className="mt-12 items-center">
          <Text className="text-[#4a5568] text-xs tracking-[3px]">PAIN IS TEMPORARY. PRIDE IS FOREVER.</Text>
        </View>
      </View>
    </ScrollView>
  );
}