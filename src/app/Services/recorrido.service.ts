import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { EventosPorDia } from '../types/Horario';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  constructor(private http: HttpClient) { }


  public getHorarios(id:number){
    return this.http.get<EventosPorDia>(`${environment.API_URL}/horrario/recorrido/${id}`)
  }

}
