import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { syncWorkouts } from '../../lib/syncService';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen() {
  const { streak, completedWorkouts, lastSynced, setLastSynced } = useWorkoutStore();
  const [isSyncing, setIsSyncing] = useState(false);

  const unsyncedCount = completedWorkouts.filter(w => !w.synced).length;

  const formatLastSynced = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleSync = async () => {
    setIsSyncing(true);
    const result = await syncWorkouts();
    setIsSyncing(false);

    if (result.success) {
      Alert.alert('Sync Complete', result.message);
    } else {
      Alert.alert('Sync Failed', result.message || 'Please try again');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/login');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0a0f14]">
      <View className="p-6 pt-14">
        {/* Header */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-[#c5a46e] rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#0a0f14" />
          </View>
          <Text className="text-white text-3xl font-bold tracking-widest">WARRIOR</Text>
          <Text className="text-[#c5a46e] text-lg tracking-[2px]">RANK: PRIVATE</Text>
        </View>

        {/* Sync Status Indicator */}
        <View className="bg-[#121a24] rounded-3xl p-5 mb-6 border border-[#c5a46e]/20">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons 
                name={unsyncedCount > 0 ? "cloud-offline" : "cloud-done"} 
                size={22} 
                color={unsyncedCount > 0 ? "#f59e0b" : "#4ade80"} 
              />
              <Text className="text-white text-lg font-semibold ml-3">Sync Status</Text>
            </View>
            <Pressable 
              onPress={handleSync} 
              disabled={isSyncing}
              className="bg-[#c5a46e] px-4 py-1.5 rounded-full active:opacity-80"
            >
              <Text className="text-[#0a0f14] text-xs font-bold tracking-widest">
                {isSyncing ? 'SYNCING...' : 'SYNC NOW'}
              </Text>
            </Pressable>
          </View>

          <View className="flex-row justify-between items-end">
            <View>
              <Text className="text-[#a0aec0] text-sm">Last synced</Text>
              <Text className="text-white text-xl font-semibold">
                {formatLastSynced(lastSynced)}
              </Text>
            </View>

            {unsyncedCount > 0 && (
              <View className="bg-[#f59e0b] px-3 py-1 rounded-full">
                <Text className="text-[#0a0f14] text-xs font-bold">
                  {unsyncedCount} PENDING
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Mission Stats */}
        <View className="bg-[#121a24] rounded-3xl p-6 mb-6 border border-[#c5a46e]/20">
          <Text className="text-[#c5a46e] text-sm tracking-[3px] mb-4">MISSION STATS</Text>
          
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <Text className="text-white text-4xl font-bold">{completedWorkouts.length}</Text>
              <Text className="text-[#a0aec0] text-sm tracking-widest">WORKOUTS</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-4xl font-bold">{streak}</Text>
              <Text className="text-[#a0aec0] text-sm tracking-widest">DAY STREAK</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-4xl font-bold">{Math.floor(completedWorkouts.length * 0.75)}</Text>
              <Text className="text-[#a0aec0] text-sm tracking-widest">HOURS</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-[#121a24] rounded-3xl overflow-hidden border border-[#c5a46e]/20 mb-6">
          {[ 
            { icon: 'trophy', label: 'Achievements & Ranks', action: () => {} },
            { icon: 'bar-chart', label: 'Progress History', action: () => {} },
            { icon: 'settings', label: 'Settings', action: () => {} },
            { icon: 'help-circle', label: 'Support & FAQ', action: () => {} },
          ].map((item, index) => (
            <Pressable 
              key={index}
              onPress={item.action}
              className="flex-row items-center p-5 border-b border-[#c5a46e]/10 active:bg-[#1a2533]"
            >
              <Ionicons name={item.icon as any} size={24} color="#c5a46e" className="mr-4" />
              <Text className="text-white text-lg flex-1">{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable 
          onPress={handleLogout}
          className="bg-red-900/30 border border-red-500/50 py-5 rounded-2xl active:opacity-90"
        >
          <Text className="text-red-400 text-center text-xl font-bold tracking-[2px]">LOGOUT</Text>
        </Pressable>

        <Text className="text-center text-[#4a5568] text-xs tracking-widest mt-8">FORGEFIT v2.0 • BUILT WITH GRIT</Text>
      </View>
    </ScrollView>
  );
}