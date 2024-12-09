export interface IRecorrido {
  id?: number;
  titulo: string;
  precio: number; // Si prefieres que sea un número, cámbialo a `number`.
  descripcion: string;
  descripcion_incluye: string;
  descripcion_importante_reservar: string;
  img_recorrido: string | File;
  duracion: number; // En minutos
  valoracion?: number;

  // cantidad_personas: number;
  // precio_persona_extra: number; // También se puede cambiar a `number` si es necesario.
  estado?: number; // Puede representar un booleano o un estado específico
  created_at?: string; // Fecha en formato ISO
  updated_at?: string; // Fecha en formato ISO
}




