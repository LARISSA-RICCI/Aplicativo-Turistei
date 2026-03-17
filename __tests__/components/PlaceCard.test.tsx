import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlaceCard } from '@/components';
import type { Place } from '@/data/places';

const mockPlace: Place = {
  id: '1',
  nome: 'Sabor Tropeiro',
  categoria: 'Restaurantes',
  avaliacao: 4.8,
  votos: 980,
  endereco: 'Barretos, SP',
  preco: 'R$$',
  emoji: '🍽️',
  aberto: true,
};

describe('PlaceCard', () => {
  it('renders place name and rating', () => {
    const { getByText } = render(
      <PlaceCard
        place={mockPlace}
        isFavorite={false}
        onPress={() => {}}
        onFavoritePress={() => {}}
      />
    );
    expect(getByText('Sabor Tropeiro')).toBeTruthy();
    expect(getByText(/4\.8/)).toBeTruthy();
  });

  it('shows favorito when isFavorite is true', () => {
    const { getByLabelText } = render(
      <PlaceCard
        place={mockPlace}
        isFavorite={true}
        onPress={() => {}}
        onFavoritePress={() => {}}
      />
    );
    expect(getByLabelText('Remover dos favoritos')).toBeTruthy();
  });

  it('calls onFavoritePress when favorite button is pressed', () => {
    const onFavoritePress = jest.fn();
    const { getByLabelText } = render(
      <PlaceCard
        place={mockPlace}
        isFavorite={false}
        onPress={() => {}}
        onFavoritePress={onFavoritePress}
      />
    );
    fireEvent.press(getByLabelText('Adicionar aos favoritos'));
    expect(onFavoritePress).toHaveBeenCalledTimes(1);
  });
});
