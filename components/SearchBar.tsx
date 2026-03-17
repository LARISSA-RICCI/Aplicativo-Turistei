import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

export function SearchBar({
  placeholder = 'Buscar bares, restaurantes...',
  value,
  onChangeText,
  onPress,
}: SearchBarProps) {
  const isControlled = value !== undefined && onChangeText !== undefined;

  const content = (
    <>
      <Text className="text-base">🔍</Text>
      {isControlled ? (
        <TextInput
          className="flex-1 text-sm text-text py-0"
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          editable
          accessibilityLabel={placeholder}
        />
      ) : (
        <Text className="text-textMuted text-sm flex-1">{placeholder}</Text>
      )}
    </>
  );

  if (isControlled) {
    return (
      <View
        className="flex-row items-center gap-2.5 bg-surface rounded-full px-4 h-[46px]"
        accessibilityRole="search"
      >
        {content}
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="flex-row items-center gap-2.5 bg-surface rounded-full px-4 h-[46px]"
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Campo de busca"
      accessibilityRole="search"
    >
      {content}
    </TouchableOpacity>
  );
}
