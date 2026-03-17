import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  greeting?: string;
  location?: string;
  searchPlaceholder?: string;
  onSearchPress?: () => void;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

export function Header({
  greeting = 'Olá, Viajante 👋',
  location = '📍 Barretos, SP',
  searchPlaceholder = 'Para onde você quer ir?',
  onSearchPress,
  searchValue,
  onSearchChange,
}: HeaderProps) {
  return (
    <View className="bg-primary pt-4 pb-6 px-4">
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Text
            className="text-[13px] text-white/80"
            accessibilityLabel={`Localização: ${location}`}
          >
            {location}
          </Text>
          <Text className="text-xl font-bold text-white mt-1" accessibilityLabel={greeting}>
            {greeting}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-white/20 rounded-full p-2.5"
          accessibilityLabel="Notificações"
          accessibilityRole="button"
        >
          <Text className="text-xl">🔔</Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        placeholder={searchPlaceholder}
        value={searchValue}
        onChangeText={onSearchChange}
        onPress={!searchValue && !onSearchChange ? onSearchPress : undefined}
      />
    </View>
  );
}
