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


    getAllBoletosAdmin(){
      return this.http.get<IBoletosAdmin[]>(`${environment.API_URL}/admin/boletos`)
    }


    getBoletosVendidos(){
      return this.http.get<IPagination<IVentaAdmin>>(`${environment.API_URL}/venta/boletos`)
    }
}
