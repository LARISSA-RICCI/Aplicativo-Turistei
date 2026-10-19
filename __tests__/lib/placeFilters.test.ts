import { PLACES } from '@/data/places';
import { filterPlaces, EMPTY_FILTERS } from '@/lib/placeFilters';

describe('filterPlaces', () => {
  it('retorna todos os lugares sem filtros', () => {
    expect(filterPlaces(PLACES)).toHaveLength(PLACES.length);
  });
  it('busca sem diferenciar acentos e caixa', () => {
    expect(filterPlaces(PLACES, 'AGUA DOCE').map((p) => p.id)).toEqual(['7']);
  });
  it('combina categorias, preço, nota e texto', () => {
    const result = filterPlaces(PLACES, 'Barretos', {
      categorias: ['Restaurantes'],
      preco: 'R$$',
      avaliacaoMin: 4.7,
    });
    expect(result.map((p) => p.id)).toEqual(['1', '2']);
  });
  it('retorna vazio quando nenhum lugar corresponde', () => {
    expect(filterPlaces(PLACES, 'não existe', EMPTY_FILTERS)).toEqual([]);
  });
});
