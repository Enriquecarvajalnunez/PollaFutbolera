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
   { grupo: 'Grupo A', equipoA: 'México',  equipoB: 'Sudáfrica' },
   { grupo: 'Grupo A', equipoA: 'Corea del Sur',    equipoB: 'República Checa' },
   { grupo: 'Grupo B', equipoA: 'Canadá',    equipoB: 'Bosnia y Herzegovina' },
   { grupo: 'Grupo B', equipoA: 'Catar',    equipoB: 'Suiza' },
   { grupo: 'Grupo C', equipoA: 'Brasil',    equipoB: 'Marruecos' },
   { grupo: 'Grupo C', equipoA: 'Haití',    equipoB: 'Escocia' },
   { grupo: 'Grupo D', equipoA: 'Estados Unidos',    equipoB: 'Paraguay' },
   { grupo: 'Grupo D', equipoA: 'Australia',    equipoB: 'Turquía' },
   { grupo: 'Grupo E', equipoA: 'Alemania',    equipoB: 'Curazao' },
   { grupo: 'Grupo E', equipoA: 'Costa de Marfil',    equipoB: 'Ecuador' },
   { grupo: 'Grupo F', equipoA: 'Países Bajos',    equipoB: 'Japón' },
   { grupo: 'Grupo F', equipoA: 'Suecia',    equipoB: 'Túnez' },
   { grupo: 'Grupo G', equipoA: 'Bélgica',    equipoB: 'Egipto' },
   { grupo: 'Grupo G', equipoA: 'Irán',    equipoB: 'Nueva Zelanda' },
   { grupo: 'Grupo H', equipoA: 'España',    equipoB: 'Cabo Verde' },
   { grupo: 'Grupo H', equipoA: 'Arabia Saudita',    equipoB: 'Uruguay' },
   { grupo: 'Grupo I', equipoA: 'Francia',    equipoB: 'Senegal' },
   { grupo: 'Grupo I', equipoA: 'Irak',    equipoB: 'Noruega' },
   { grupo: 'Grupo J', equipoA: 'Argentina',    equipoB: 'Argelia' },
   { grupo: 'Grupo J', equipoA: 'Austria',    equipoB: 'Jordania' },
   { grupo: 'Grupo K', equipoA: 'Portugal',    equipoB: 'RD Congo' },
   { grupo: 'Grupo K', equipoA: 'Uzbekistán',    equipoB: 'Colombia' },
   { grupo: 'Grupo L', equipoA: 'Inglaterra',    equipoB: 'Croacia' },
   { grupo: 'Grupo L', equipoA: 'Ghana',    equipoB: 'Panamá' },
];
