import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGuia } from '../types/Guias';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  constructor(private http: HttpClient) { }


  public updateGuia(guia: IGuia, id:number){
    return this.http.put(`${environment.API_URL}/guias/${id}`,guia);
  }

  public getById(id:number){
    return this.http.get<IGuia>(`${environment.API_URL}/guias/${id}`);
  }

}
