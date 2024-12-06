export interface IRecorridoResponse{
  cantidad_personas: number,
  tipo_recorrido: string,
  token: string,
  total_recorrido: number,
  hora_inicio: string,
  hora_fin: string,
  fecha: string,
}

export interface IVentaResponse{

  recorridos: IRecorridoResponse[]
  boletos: [],
}
