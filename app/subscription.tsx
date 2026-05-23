import { View, Text, Pressable, ScrollView, Linking, Alert } from 'react-native';

export default function SubscriptionScreen() {

  const handleSubscribe = async () => {
    // TODO: Replace with your real Stripe Checkout / Payment Link
    const stripeCheckoutUrl = 'https://buy.stripe.com/test_xxxxxx'; // <-- Replace with your Stripe link

    const supported = await Linking.canOpenURL(stripeCheckoutUrl);
    if (supported) {
      await Linking.openURL(stripeCheckoutUrl);
    } else {
      Alert.alert('Error', 'Could not open payment page');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0a0f14]">
      <View className="p-6 pt-12">
        <Text className="text-white text-4xl font-bold tracking-widest text-center mb-2">FORGE ELITE</Text>
        <Text className="text-[#c5a46e] text-center text-lg mb-10 tracking-[2px]">UNLOCK THE FULL ARSENAL</Text>

        {/* Premium Card */}
        <View className="bg-[#121a24] rounded-3xl p-8 border-2 border-[#c5a46e] mb-6">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-[#c5a46e] text-sm tracking-[3px]">PREMIUM</Text>
              <Text className="text-white text-5xl font-bold mt-1">$9.99</Text>
              <Text className="text-[#a0aec0]">per month</Text>
            </View>
            <View className="bg-[#c5a46e] px-5 py-1.5 rounded-full">
              <Text className="text-[#0a0f14] font-bold text-sm tracking-widest">MOST POPULAR</Text>
            </View>
          </View>

          <View className="space-y-4 mb-8">
            {[
              "Unlimited access to all programs",
              "Advanced progress tracking & history",
              "Video exercise library",
              "Custom workout builder",
              "Weekly challenges & leaderboards",
              "Rucking & outdoor missions",
              "Priority support",
            ].map((feature, i) => (
              <View key={i} className="flex-row items-center">
                <Text className="text-[#c5a46e] mr-3 text-xl">✓</Text>
                <Text className="text-white flex-1 text-[15px]">{feature}</Text>
              </View>
            ))}
          </View>

          <Pressable 
            onPress={handleSubscribe}
            className="bg-[#c5a46e] py-5 rounded-2xl active:opacity-90"
          >
            <Text className="text-[#0a0f14] text-center text-xl font-extrabold tracking-[2px]">SUBSCRIBE WITH STRIPE</Text>
          </Pressable>

          <Text className="text-center text-[#a0aec0] mt-4 text-sm">or $79/year (save 34%)</Text>
        </View>

        <Text className="text-center text-[#4a5568] text-xs tracking-widest mt-4">CANCEL ANYTIME • SECURE PAYMENT VIA STRIPE</Text>
      </View>
    </ScrollView>
  );
}