import { PLACES } from '@/data/places';

describe('places data', () => {
  it('has at least one place', () => {
    expect(PLACES.length).toBeGreaterThan(0);
  });

  it('each place has required fields', () => {
    PLACES.forEach((place) => {
      expect(place).toHaveProperty('id');
      expect(place).toHaveProperty('nome');
      expect(place).toHaveProperty('categoria');
      expect(place).toHaveProperty('avaliacao');
      expect(place).toHaveProperty('votos');
      expect(place).toHaveProperty('endereco');
      expect(place).toHaveProperty('preco');
      expect(place).toHaveProperty('emoji');
      expect(place).toHaveProperty('aberto');
    });
  });
});
