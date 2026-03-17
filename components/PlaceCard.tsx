import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';
import type { Place } from '@/data/places';
import type { Category } from '@/data/categories';

interface PlaceCardProps {
  place: Place;
  categoryColor?: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export function PlaceCard({
  place,
  categoryColor = colors.primary,
  isFavorite,
  onPress,
  onFavoritePress,
}: PlaceCardProps) {
  const bgColor = `${categoryColor}33`;

  return (
    <TouchableOpacity
      className="bg-surface rounded-2xl overflow-hidden mb-4 shadow-md"
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityLabel={`${place.nome}, avaliação ${place.avaliacao}, ${place.aberto ? 'aberto' : 'fechado'}`}
      accessibilityRole="button"
    >
      <View
        className="h-[140px] items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <Text className="text-[52px]">{place.emoji}</Text>
        {!place.aberto && (
          <View className="absolute top-3 left-3 bg-black/55 rounded-md px-2.5 py-1">
            <Text className="text-white text-[11px] font-semibold">
              Fechado agora
            </Text>
          </View>
        )}
        <TouchableOpacity
          className="absolute top-2.5 right-3 bg-black/20 rounded-full p-2"
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress();
          }}
          accessibilityLabel={
            isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          accessibilityRole="button"
        >
          <Text className="text-lg">{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <View className="p-3">
        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="flex-1 text-base font-bold text-text mr-2" numberOfLines={1}>
            {place.nome}
          </Text>
          <View className="bg-primaryLight px-2 py-0.5 rounded-full">
            <Text className="text-xs font-semibold text-primary">
              ⭐ {place.avaliacao}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-textSecondary mb-1.5">
          📍 {place.endereco}
        </Text>
        <View className="flex-row justify-between items-center">
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${categoryColor}22` }}
          >
            <Text className="text-[11px] font-semibold" style={{ color: categoryColor }}>
              {place.categoria}
            </Text>
          </View>
          <Text className="text-xs text-textSecondary">
            {place.votos} avaliações · {place.preco}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
