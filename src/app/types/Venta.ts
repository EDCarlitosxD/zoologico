export interface IRecorridoResponse{
  cantidad: number,
  tipo_recorrido: string,
  token: string,
  total_recorrido: number,
  hora_inicio: string,
  hora_fin: string,
  fecha: string,
}

export interface IVentaResponse{

  recorridos: IRecorridoResponse[]
  boletos: IVentaBoletoResponse[],
}


export interface IVentaBoletoResponse{
  "tipo_boleto": string,
  "cantidad_boletos": number,
  "total_boletos": number,
  "token": string,
}
