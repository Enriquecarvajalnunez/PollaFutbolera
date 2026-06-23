export interface BetDisplay{
    "grupo": "string",
    "equipoA": "string",
    "equipoB": "string",
    "marcadorA": "string",
    "marcadorB": "string"
}

export interface BuscarApuestasResponse {
    success: boolean;
    nombre: string | null;
    bets: BetDisplay[] | null;
    error?: string;
}