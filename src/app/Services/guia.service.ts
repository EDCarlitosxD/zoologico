import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGuia } from '../types/Guias';
import { environment } from '../environment';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {


  private headers: HttpHeaders;
  private userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
   }



  public updateGuia(guia: IGuia, id:number){
    return this.http.put(`${environment.API_URL}/guias/${id}`,guia);
  }

  public getById(id:number){
    return this.http.get<IGuia>(`${environment.API_URL}/guias/${id}`);
  }

  public getAll(){
    return this.http.get<IGuia[]>(`${environment.API_URL}/guias`)
  }

  public actualizarEstado(estado: boolean,id:number){
    return this.http.put<boolean>(`${environment.API_URL}/guias/eliminar/${id}`,{estado},{
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
      }
    })
  }

}
