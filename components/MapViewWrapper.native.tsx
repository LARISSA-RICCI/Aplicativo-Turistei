import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import type { Place } from '@/data/places';

const BARRETOS_REGION = {
  latitude: -21.1,
  longitude: -48.5,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

interface MapViewWrapperProps {
  places: Place[];
  onMarkerPress: (placeId: string) => void;
}

export function MapViewWrapper({
  places,
  onMarkerPress,
}: MapViewWrapperProps) {
  const placesWithCoords = places.filter((p) => p.lat != null && p.lng != null);

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      initialRegion={BARRETOS_REGION}
      showsUserLocation
      showsMyLocationButton={false}
    >
      {placesWithCoords.map((place) => (
        <Marker
          key={place.id}
          coordinate={{
            latitude: place.lat!,
            longitude: place.lng!,
          }}
          title={place.nome}
          description={place.categoria}
          onPress={() => onMarkerPress(place.id)}
        />
      ))}
    </MapView>
  );
}
