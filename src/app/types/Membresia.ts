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
    regalo_bienvenida: string,
    charlas_educativas: boolean,
    estado: boolean,
  }
  
  export interface IMembresiaCard {
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
    regalo_bienvenida: string | null,
    charlas_educativas: boolean,
  }

  export interface IMembresiaShort {
    id?: number | null,
    nombre: string | null,
    precio: number,
    imagen: string,
  }

  export interface IMembresiaUser {
    id_membresia: number | null | undefined,
    id_usuario: number,
    meses: number,
    precio_total: number,
    img: string | null
  }