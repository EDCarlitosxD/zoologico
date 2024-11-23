export enum AnimalEnum{
  Terrestre = 'terrestre',
  Aéreo = 'aéreo',
  Acuático = 'acuático',
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
