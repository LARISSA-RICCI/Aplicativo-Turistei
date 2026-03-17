import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const { signInWithGoogle, isConfigured } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (!isConfigured) {
      router.replace('/(tabs)');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: err } = await signInWithGoogle();
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-primary p-6 pt-12 items-center min-h-[200px] overflow-hidden">
          <View className="absolute w-[120px] h-[120px] rounded-[60px] bg-white/10 top-5 -left-5" />
          <View className="absolute w-20 h-20 rounded-[40px] bg-white/[0.08] top-[60px] right-5" />
          <View className="mb-3">
            <MaterialIcons name="place" size={32} color="#E53935" />
          </View>
          <Text className="text-[28px] font-bold text-white">Turistei</Text>
          <Text className="text-sm text-white/90 mt-2">
            Descubra o que há perto de você
          </Text>
        </View>

        <View className="flex-1 p-6 pt-8">
          <Text className="text-[22px] font-bold text-text mb-6">
            Bem-vindo (a) 👋
          </Text>

          <Button
            title="Continuar com Google"
            variant="outline"
            loading={loading}
            onPress={handleGoogleSignIn}
            style={{ marginBottom: 16 }}
          />

          {error ? (
            <Text className="text-[13px] text-error mb-4 text-center">
              {error}
            </Text>
          ) : null}

          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-sm text-text">Não tem conta? </Text>
            <Link href="/(auth)/cadastro" asChild>
              <TouchableOpacity>
                <Text className="text-sm text-primary font-bold">
                  Criar conta Grátis
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
