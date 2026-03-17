import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Category } from '@/data/categories';

interface CategoryChipProps {
  category: Category;
  selected?: boolean;
  onPress: () => void;
}

export function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      className={`items-center mr-3 rounded-2xl p-2 bg-surface min-w-[72px] ${
        selected ? 'border-2' : ''
      }`}
      style={selected ? { borderColor: category.cor } : undefined}
      onPress={onPress}
      accessibilityLabel={`Categoria ${category.nome}${selected ? ', selecionada' : ''}`}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
    >
      <View
        className="w-[52px] h-[52px] rounded-2xl items-center justify-center mb-1.5"
        style={{ backgroundColor: `${category.cor}22` }}
      >
        <Text className="text-2xl">{category.emoji}</Text>
      </View>
      <Text
        className={`text-[11px] text-textSecondary text-center ${
          selected ? 'font-bold' : ''
        }`}
        style={selected ? { color: category.cor } : undefined}
      >
        {category.nome}
      </Text>
    </TouchableOpacity>
  );
}
