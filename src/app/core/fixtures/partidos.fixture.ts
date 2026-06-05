/**
 * Partidos del torneo — hardcodeados en el frontend.
 * Modifica SOLO este archivo para cambiar el fixture.
 *
 * Cada entrada representa un partido con su grupo y equipos.
 * El orden importa: el índice de cada entrada se corresponde
 * con el índice en el FormArray de apuestas.
 *
 * Estructura esperada: 24 partidos (los ingresa el equipo).
 */
export interface Partido {
  grupo: string;
  equipoA: string;
  equipoB: string;
}

export const PARTIDOS: Partido[] = [    
   { grupo: 'Grupo A', equipoA: 'Colombia',  equipoB: 'Venezuela' },
   { grupo: 'Grupo A', equipoA: 'Brasil',    equipoB: 'Argentina' },
];
