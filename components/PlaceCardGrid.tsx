import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';
import type { Place } from '@/data/places';

const CARD_GAP = 12;
const SCREEN_PADDING = 32;
const CARD_WIDTH =
  (Dimensions.get('window').width - SCREEN_PADDING - CARD_GAP) / 2;

interface PlaceCardGridProps {
  place: Place;
  categoryColor?: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export function PlaceCardGrid({
  place,
  categoryColor = colors.primary,
  isFavorite,
  onPress,
  onFavoritePress,
}: PlaceCardGridProps) {
  const bgColor = `${categoryColor}33`;

  return (
    <TouchableOpacity
      className="rounded-[18px] overflow-hidden shadow-lg bg-surface mb-3"
      style={{ width: CARD_WIDTH }}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityLabel={`${place.nome}, avaliação ${place.avaliacao}, ${place.aberto ? 'aberto' : 'fechado'}`}
      accessibilityRole="button"
    >
      <View
        className="h-[100px] items-center justify-center rounded-t-[18px]"
        style={{ backgroundColor: bgColor }}
      >
        <Text className="text-[40px]">{place.emoji}</Text>
        {!place.aberto && (
          <View className="absolute top-2 left-2 bg-black/55 rounded-md px-2 py-0.5">
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
        <Text className="text-sm font-bold text-text mb-0.5" numberOfLines={1}>
          {place.nome}
        </Text>
        <Text className="text-xs text-textSecondary mb-1">
          {place.categoria}
        </Text>
        <View className="flex-row items-center justify-between gap-1">
          <View className="flex-row items-center gap-0.5">
            <MaterialIcons name="star" size={14} color="#F59E0B" />
            <Text className="text-[11px] font-semibold text-amber-500">
              {place.avaliacao}
            </Text>
          </View>
          {place.distancia ? (
            <View className="flex-row items-center gap-0.5">
              <MaterialIcons name="place" size={12} color="#6B7280" />
              <Text className="text-[11px] text-gray-500">{place.distancia}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
