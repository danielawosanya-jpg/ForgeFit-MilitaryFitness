import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-[#0a0f14] p-6 justify-center">
      <Text className="text-white text-5xl font-bold tracking-widest text-center mb-2">FORGEFIT</Text>
      <Text className="text-[#c5a46e] text-center text-xl tracking-[3px] mb-12">WELCOME BACK, WARRIOR</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        className="bg-[#121a24] text-white p-5 rounded-2xl mb-4 text-lg border border-[#c5a46e]/30"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        className="bg-[#121a24] text-white p-5 rounded-2xl mb-8 text-lg border border-[#c5a46e]/30"
        secureTextEntry
      />

      <Pressable 
        onPress={handleLogin} 
        disabled={loading}
        className="bg-[#c5a46e] py-5 rounded-2xl active:opacity-90 mb-4"
      >
        <Text className="text-[#0a0f14] text-center text-xl font-extrabold tracking-[2px]">
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </Text>
      </Pressable>

      <Link href="/signup" asChild>
        <Pressable className="py-4">
          <Text className="text-[#c5a46e] text-center text-lg tracking-widest">
            DON'T HAVE AN ACCOUNT? <Text className="font-bold">SIGN UP</Text>
          </Text>
        </Pressable>
      </Link>

      <Text className="text-center text-[#4a5568] text-xs tracking-widest mt-8">SECURE MILITARY-GRADE AUTHENTICATION</Text>
    </View>
  );
}