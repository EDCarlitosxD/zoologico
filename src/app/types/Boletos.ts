export interface IBoleto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string; // Si el precio debe ser tratado como número, puedes usar `number` en lugar de `string`.
  estado: number; // Probablemente 1 para activo y 0 para inactivo.
  imagen: string; // URL de la imagen.
  created_at: string; // Fecha de creación en formato ISO.
  updated_at: string; // Fecha de actualización en formato ISO.
}
