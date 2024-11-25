export enum AnimalEnum{
  Terrestre = 'terrestre',
  Aereo = 'aéreo',
  Acuatico = 'acuático',
  Anfibio = 'anfibio'
}

export interface IAnimalCard{
  "nombre": string,
  "imagen_principal": string,
  "tipo": AnimalEnum,
  "peso": string,
  "altura": string,
  "nombre_cientifico": string,
  'slug': string
}



export interface IAnimal {
  id: number|null
  nombre: string;
  nombre_cientifico: string;
  imagen_principal: string;
  imagen_secundaria: string;
  caracteristicas_fisicas: string;
  dieta: string;
  datos_curiosos: string;
  comportamiento: string;
  peso: string;
  altura: string;
  tipo: string;
  habitat: string;
  descripcion: string;
  subtitulo: string;
  qr: string;
  img_ubicacion: string;
  estado: string;
}
