/**
 * Modelo de dominio que representa un partido del torneo.
 * Separado del fixture de datos para que el origen de los partidos
 * (hardcodeado, API, Firestore…) no afecte a quien consume el tipo.
 */
export interface Partido {
  grupo: string;
  equipoA: string;
  equipoB: string;
}
