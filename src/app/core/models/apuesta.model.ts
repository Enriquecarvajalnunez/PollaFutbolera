export interface BetEntry {
  grupo: string;
  equipoA: string;
  equipoB: string;
  marcadorA: number;
  marcadorB: number;
}

export interface ApuestaPayload {
  nombre: string;
  identificacion: string;
  bets: BetEntry[];
}

export interface RegistrarApuestaResponse {
  success: boolean;
  jugadorId?: number;
  error?: string;
}
