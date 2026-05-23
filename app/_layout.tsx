import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0f14' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'FORGEFIT' }} />
        <Stack.Screen name="workouts" options={{ title: 'WORKOUTS' }} />
        <Stack.Screen name="subscription" options={{ title: 'SUBSCRIBE' }} />
      </Stack>
    </>
  );
}