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
