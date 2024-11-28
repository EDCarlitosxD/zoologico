export interface IRecorrido {
  id: number;
  titulo: string;
  precio: string; // Si prefieres que sea un número, cámbialo a `number`.
  descripcion: string;
  duracion: number; // En minutos
  cantidad_personas: number;
  precio_persona_extra: string; // También se puede cambiar a `number` si es necesario.
  estado: number; // Puede representar un booleano o un estado específico
  created_at: string; // Fecha en formato ISO
  updated_at: string; // Fecha en formato ISO
}
