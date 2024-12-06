export interface ITarjeta {
  id?: number; // ID de la tarjeta
  fecha_expiracion: string; // Fecha de expiración en formato de texto
  banco: string; // Nombre del banco
  numero_tarjeta: string; // Número de tarjeta (enmascarado o no según el uso)
  nombre_tarjeta: string; // Nombre del titular de la tarjeta
  ccv: string; // Código de seguridad
  tipo_tarjeta: string; // Tipo de tarjeta (ejemplo: crédito o débito)
  id_usuario: number; // ID del usuario relacionado
}
