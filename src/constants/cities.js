/**
 * Catálogo de Puntos de Salida Oficiales - ConcertTrip
 * Estructura optimizada para selectores (Pickers) y filtros de búsqueda.
 */

export const DEPARTURE_CITIES = [
  { id: 'qro', name: 'Querétaro', state: 'Qro', region: 'Bajío' },
  { id: 'cdmx', name: 'Ciudad de México', state: 'CDMX', region: 'Centro' },
  { id: 'mty', name: 'Monterrey', state: 'NL', region: 'Norte' },
  { id: 'gdl', name: 'Guadalajara', state: 'Jal', region: 'Occidente' },
  { id: 'pue', name: 'Puebla', state: 'Pue', region: 'Centro' },
  { id: 'leo', name: 'León', state: 'Gto', region: 'Bajío' },
  { id: 'tol', name: 'Toluca', state: 'Edomex', region: 'Centro' },
];

// Opcional: Una lista simplificada para funciones que solo requieran los nombres
export const CITY_NAMES = DEPARTURE_CITIES.map(city => city.name);