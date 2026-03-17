import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';
import type { Place } from '@/data/places';

interface MapViewWrapperProps {
  places: Place[];
  onMarkerPress: (placeId: string) => void;
}

export function MapViewWrapper(_props: MapViewWrapperProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <MaterialIcons name="map" size={80} color={colors.primaryMuted} />
      <Text className="text-lg font-bold text-text mt-3">Mapa</Text>
      <Text className="text-[13px] text-textSecondary mt-1">
        O mapa está disponível em iOS e Android
      </Text>
    </View>
  );
}
