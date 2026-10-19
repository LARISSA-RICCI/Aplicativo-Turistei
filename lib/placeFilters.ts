import type { Place } from '@/data/places';

export interface PlaceFilters {
  categorias: string[];
  preco: string | null;
  avaliacaoMin: number | null;
}

export const EMPTY_FILTERS: PlaceFilters = {
  categorias: [],
  preco: null,
  avaliacaoMin: null,
};

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

export function filterPlaces(places: readonly Place[], query = '', filters: PlaceFilters = EMPTY_FILTERS): Place[] {
  const search = normalize(query);
  return places.filter((place) => {
    if (filters.categorias.length > 0 && !filters.categorias.includes(place.categoria)) return false;
    if (filters.preco && place.preco !== filters.preco) return false;
    if (filters.avaliacaoMin != null && place.avaliacao < filters.avaliacaoMin) return false;
    if (!search) return true;
    return normalize([place.nome, place.categoria, place.endereco, place.descricao ?? ''].join(' ')).includes(search);
  });
}
