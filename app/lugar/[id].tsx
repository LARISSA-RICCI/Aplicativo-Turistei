import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/hooks/useFavorites';
import { colors } from '@/constants/theme';

export default function LugarDetalheScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { toggleFav, isFavorite } = useFavorites();

  const place = PLACES.find((p) => p.id === id);
  if (!place) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Text>Local não encontrado</Text>
      </SafeAreaView>
    );
  }

  const fav = isFavorite(place.id);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity
          onPress={handleBack}
          className="p-2"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFav(place.id)}
          className="p-2"
          accessibilityLabel={
            fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          accessibilityRole="button"
        >
          <MaterialIcons
            name={fav ? 'favorite' : 'favorite-border'}
            size={24}
            color={fav ? '#E53935' : colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="h-[220px] items-center justify-center"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <Text className="text-[80px]">{place.emoji}</Text>
        </View>

        <View className="p-5">
          <View className="flex-row items-center gap-3 mb-2">
            <Text className="text-2xl font-bold text-text flex-1">
              {place.nome}
            </Text>
            {fav && (
              <View className="bg-[#FFEB3B] px-2.5 py-1 rounded-lg">
                <Text className="text-xs font-bold text-text">Favorito</Text>
              </View>
            )}
          </View>

          <Text className="text-base text-textSecondary mb-1">
            {place.avaliacao} (
            {place.votos.toLocaleString('pt-BR')} avaliações)
          </Text>
          <Text className="text-sm text-textSecondary mb-5">
            {place.distancia ?? place.endereco} • {place.categoria}
          </Text>

          {place.descricao ? (
            <>
              <Text className="text-lg font-bold text-text mb-2">Sobre</Text>
              <Text className="text-[15px] text-textSecondary leading-[22px] mb-5">
                {place.descricao}
              </Text>
            </>
          ) : null}

          {place.comodidades && place.comodidades.length > 0 ? (
            <>
              <Text className="text-lg font-bold text-text mb-2">
                Comodidades
              </Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {place.comodidades.map((c) => (
                  <View
                    key={c}
                    className="bg-primaryLight px-3 py-2 rounded-lg"
                  >
                    <Text className="text-sm text-primary font-semibold">
                      {c}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center mb-3"
            onPress={() => {}}
          >
            <Text className="text-base font-bold text-white">Como Chegar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 border-2 border-primary rounded-xl py-3.5"
            onPress={() => toggleFav(place.id)}
          >
            <MaterialIcons name="add" size={20} color={colors.primary} />
            <Text className="text-base font-bold text-primary">Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
