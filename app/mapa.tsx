import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { MapViewWrapper } from '@/components/MapViewWrapper';
import { PLACES } from '@/data/places';
import { colors } from '@/constants/theme';

export default function MapaScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('Barretos');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/buscar/resultados');
    }
  };

  const placesWithCoords = useMemo(
    () => PLACES.filter((p) => p.lat != null && p.lng != null),
    []
  );
  const selectedPlace = selectedPlaceId
    ? PLACES.find((p) => p.id === selectedPlaceId)
    : placesWithCoords[0];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center p-4 gap-3">
        <TouchableOpacity
          className="p-2 -ml-1"
          onPress={handleBack}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-primaryLight rounded-xl px-4 h-[46px] gap-2.5">
          <MaterialIcons name="search" size={20} color={colors.textMuted} />
          <TextInput
            className="flex-1 text-base text-text py-2"
            placeholder="Barretos"
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          className="p-2"
          accessibilityLabel="Minha localização"
          accessibilityRole="button"
        >
          <MaterialIcons name="my-location" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push('/filtros')}
          accessibilityLabel="Filtros"
          accessibilityRole="button"
        >
          <MaterialIcons name="filter-list" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mx-4 rounded-2xl overflow-hidden">
        <MapViewWrapper
          places={PLACES}
          onMarkerPress={setSelectedPlaceId}
        />
      </View>

      {selectedPlace && (
        <View className="flex-row bg-surface m-4 rounded-2xl overflow-hidden shadow-lg">
          <View
            className="w-[100px] h-[100px] items-center justify-center"
            style={{ backgroundColor: `${colors.primary}33` }}
          >
            <Text className="text-[48px]">{selectedPlace.emoji}</Text>
          </View>
          <View className="flex-1 p-4 justify-center">
            <Text className="text-lg font-bold text-text">
              {selectedPlace.nome}
            </Text>
            <Text className="text-sm text-textSecondary mt-1">
              ⭐ {selectedPlace.avaliacao} •{' '}
              {selectedPlace.distancia ?? selectedPlace.endereco}
            </Text>
            <TouchableOpacity
              className="mt-3 self-start bg-primary px-4 py-2 rounded-lg"
              onPress={() =>
                router.push({
                  pathname: '/lugar/[id]',
                  params: { id: selectedPlace.id },
                })
              }
            >
              <Text className="text-sm font-bold text-white">Ver mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
