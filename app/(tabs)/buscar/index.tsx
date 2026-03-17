import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

export default function BuscaHeroScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    router.push({
      pathname: '/buscar/resultados',
      params: { q: query || 'Barretos' },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row justify-between items-center px-5 py-4">
        <Text className="text-[22px] font-bold text-primary">Turistei</Text>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-primaryMuted items-center justify-center"
          accessibilityLabel="Perfil"
          accessibilityRole="button"
        >
          <MaterialIcons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-4 gap-4">
        <View className="flex-1 rounded-2xl bg-[#E3F2FD] items-center justify-center min-h-[120px]">
          <Text className="text-[64px] mb-2">🌊</Text>
          <Text className="text-lg font-bold text-text">Cachoeiras</Text>
        </View>
        <View className="flex-1 rounded-2xl bg-[#FFF3E0] items-center justify-center min-h-[120px]">
          <Text className="text-[64px] mb-2">🏖️</Text>
          <Text className="text-lg font-bold text-text">Praias</Text>
        </View>
      </View>

      <View className="px-5 pb-8">
        <TouchableOpacity
          className="flex-row items-center bg-surface rounded-full px-5 h-[52px] gap-3 shadow-lg"
          onPress={handleSearch}
          activeOpacity={0.8}
        >
          <MaterialIcons name="search" size={22} color={colors.textMuted} />
          <TextInput
            className="flex-1 text-base text-text py-0"
            placeholder="Para onde você quer ir?"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
