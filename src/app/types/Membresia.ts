export interface IMembresia {
    id?: number | null,
    nombre: string | null,
    precio: number,

    imagen: string,

    entradas_ilimitadas: boolean,
    descuento_alimentos_souvenirs: number,
    acceso_eventos: boolean,
    descuento_tours: number, 
    experiencias_animales: boolean,
    estacionamiento_preferencial: boolean,
    detras_camaras: boolean,
    recorrido_vip_gratuito: boolean,
    programas_conservacion: boolean,
    descuento_renta_espacios_eventos: number,
    precio_especial_invitados: number,
    regalo_bienvenida: boolean,
    charlas_educativas: string,
    estado: boolean,
  }
  