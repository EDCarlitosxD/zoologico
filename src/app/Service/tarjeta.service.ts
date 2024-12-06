import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';
import { environment } from '../environment';
import { ITarjeta } from '../types/Tarjetas';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.userDetails = getUserDetails();
   }



   getTarjetas(){
    return this.http.get<ITarjeta[]>(`${environment.API_URL}/tarjeta/${this.userDetails?.user.id}`, {
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
    }
    })

  }


  guardar(tarjeta: ITarjeta){
    tarjeta.id_usuario = this.userDetails!.user.id
    return this.http.post<ITarjeta>(`${environment.API_URL}/tarjeta`, tarjeta ,{
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
    }
    })

  }


  eliminar(id: number){
    return this.http.delete(`${environment.API_URL}/tarjeta/eliminar/${id!}` ,{
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
    }
    })

  }

}
