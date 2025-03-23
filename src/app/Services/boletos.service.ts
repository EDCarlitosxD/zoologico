import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { IBoleto, IBoletosAdmin, IVentaAdmin } from '../types/Boletos';
import { IPagination } from '../types/Pagination';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(private http: HttpClient) { }

    getAllBoletos(estado: number|null = null){
      if(estado ){
        const queryParams = new HttpParams()
        queryParams.append('estado',estado)
      }
      return this.http.get<IBoleto[]>(`${environment.API_URL}/boletos`)
    }

    getById(id: number) {
      return this.http.get<IBoleto>(`${environment.API_URL}/boletos/${id}`)
    }


    getAllBoletosAdmin(){
      return this.http.get<IBoletosAdmin[]>(`${environment.API_URL}/admin/boletos`)
    }


    getBoletosVendidos(){
      return this.http.get<IPagination<IVentaAdmin>>(`${environment.API_URL}/venta/boletos`)
    }

    updateBoleto(id: number, boleto: IBoleto) {
      return this.http.put(`${environment.API_URL}/boletos/actualizar/${id}`, boleto);
    }

    updateEstado(id: number, estado: boolean) {
      return this.http.put(`${environment.API_URL}/boletos/eliminar/${id}`, {
        'estado': estado
      })
    }
}
