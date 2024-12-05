// export interface ITour {
//   id: number;
//   nombre: string,
//   precio: number,
//   img: string,
//   valoracion: number,
//   descripcionPrincipal: string,
//   incluye: string,
//   alReservar: string,
//   contador: number,
//   fecha: string,
//   horario: number
// }

export interface ITour {
  id: number;
  titulo: string;
  precio: string;
  descripcion: string;
  duracion: number;
  // cantidad_personas: number;
  // precio_persona_extra: string;
  estado: number;
  created_at: string; // Fecha en formato ISO
  updated_at: string; // Fecha en formato ISO
}

