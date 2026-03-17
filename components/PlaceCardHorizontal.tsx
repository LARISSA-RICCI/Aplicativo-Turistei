import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';
import type { Place } from '@/data/places';

interface PlaceCardHorizontalProps {
  place: Place;
  categoryColor?: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export function PlaceCardHorizontal({
  place,
  categoryColor = colors.primary,
  isFavorite,
  onPress,
  onFavoritePress,
}: PlaceCardHorizontalProps) {
  const bgColor = `${categoryColor}33`;

  return (
    <TouchableOpacity
      className="w-[160px] bg-surface rounded-xl overflow-hidden mr-3 shadow"
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityLabel={`${place.nome}, avaliação ${place.avaliacao}`}
      accessibilityRole="button"
    >
      <View
        className="h-[100px] items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <Text className="text-[40px]">{place.emoji}</Text>
        {!place.aberto && (
          <View className="absolute top-2 left-2 bg-black/55 rounded px-1.5 py-0.5">
            <Text className="text-white text-[10px] font-semibold">Fechado</Text>
          </View>
        )}
        <TouchableOpacity
          className="absolute top-2 right-2 bg-black/20 rounded-full p-1.5"
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress();
          }}
          accessibilityLabel={
            isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          accessibilityRole="button"
        >
          <Text className="text-sm">{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <View className="p-2.5">
        <Text className="text-sm font-bold text-text mb-1" numberOfLines={1}>
          {place.nome}
        </Text>
        <Text className="text-xs text-textSecondary mb-0.5">
          ⭐ {place.avaliacao}
        </Text>
        <Text className="text-[11px] text-textMuted">
          📍 {place.distancia ?? place.endereco}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
