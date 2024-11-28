import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { IBoleto } from '../types/Boletos';

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
}
