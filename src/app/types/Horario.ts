export interface Evento {
  id: number;
  horario_inicio: string;
  horario_fin: string;
  disponible: number;
}

export type EventosPorDia = Record<string, Evento[]>;
