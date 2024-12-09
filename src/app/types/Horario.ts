export interface Evento {
  id: number;
  horario_inicio: string;
  horario_fin: string;
  disponible: number;
  fecha: Date,
}

export interface HorarioTour{
  horario_inicio: string;
  id_guia: number;
  fecha: Date;
  horario_fin: string;
}

export type EventosPorDia = Record<string, Evento[]>;
