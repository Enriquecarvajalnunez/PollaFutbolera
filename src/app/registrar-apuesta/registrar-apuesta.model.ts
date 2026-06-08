import { Partido } from '../core/models/partido.model';

/**
 * Modelo de presentación que agrupa partidos por nombre de grupo.
 * Es un tipo de la capa de UI — no pertenece al dominio ni al fixture.
 */
export interface GrupoDisplay {
  nombre: string;
  partidos: Array<Partido & { index: number }>;
}

/**
 * Transforma un array plano de partidos en grupos para renderizar.
 *
 * Función pura: recibe los datos como parámetro, no los importa
 * directamente. Esto la hace testeable con cualquier fixture sin
 * modificar el archivo, y elimina el acoplamiento al origen del dato.
 *
 * Uso: buildGrupos(PARTIDOS)
 */
export function buildGrupos(partidos: Partido[]): GrupoDisplay[] {
  const map = new Map<string, Array<Partido & { index: number }>>();

  partidos.forEach((partido, index) => {
    if (!map.has(partido.grupo)) map.set(partido.grupo, []);
    map.get(partido.grupo)!.push({ ...partido, index });
  });

  return Array.from(map.entries()).map(([nombre, partidos]) => ({
    nombre,
    partidos,
  }));
}
