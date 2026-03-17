import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="items-center p-6 bg-primary">
        <Text className="text-[64px] mb-2">👤</Text>
        <Text className="text-[22px] font-bold text-white">
          Olá, Viajante!
        </Text>
        <Text className="text-sm text-white/80 mt-1">
          Faça login para sincronizar seus favoritos
        </Text>
      </View>
      <View className="p-4">
        <Text className="text-[17px] font-bold text-text mb-2">
          Em breve
        </Text>
        <Text className="text-sm text-textSecondary">
          Perfil de usuário, histórico e configurações
        </Text>
      </View>
    </SafeAreaView>
  );
}
