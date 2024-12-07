import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { EventosPorDia } from '../types/Horario';
import { IRecorrido } from '../types/Recorridos';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  constructor(private http: HttpClient) { }


  public getRecorridosActivos(){
    return this.http.get<IRecorrido[]>(`${environment.API_URL}/recorridos`);

  }

  public getHorarios(id:number){
    return this.http.get<EventosPorDia>(`${environment.API_URL}/horrario/recorrido/${id}`)
  }

  public getRecorridos(){
    return this.http.get<IRecorrido[]>(`${environment.API_URL}/admin/recorridos`)
  }

}
