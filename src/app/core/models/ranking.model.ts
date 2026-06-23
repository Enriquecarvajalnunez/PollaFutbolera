export interface RankingEntry {
  posicion: number;
  nombre: string;
  cedula: string;
  puntos: number;
}

export interface RankingResponse {
  success: boolean;
  ranking: RankingEntry[];
  error?: string;
}

export interface CalcularRankingResponse {
  success: boolean;
  totalJugadores: number;
  error: string | null;
}

export interface EmpateJugador {
  nombre: string;
  cedula: string;
}

export interface GrupoEmpate {
  puntos: number;
  jugadores: EmpateJugador[];
}

export interface BuscarEmpatesResponse {
  success: boolean;
  totalGruposEmpate: number;
  empates: GrupoEmpate[];
  error: string | null;
}
