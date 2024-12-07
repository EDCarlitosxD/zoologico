import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { EventosPorDia } from '../types/Horario';
import { IRecorrido } from '../types/Recorridos';
import { IRecorridoAdmin } from '../pages/dashboard-recorrido/dashboard-recorrido.component';
import { IReservaDashboard } from '../types/Reserva';
import { IPagination } from '../types/Pagination';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {
  private headers: HttpHeaders;
  private userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
   }



  public getRecorridosActivos(){
    return this.http.get<IRecorrido[]>(`${environment.API_URL}/recorridos`);

  }

  public getHorarios(id:number){
    return this.http.get<EventosPorDia>(`${environment.API_URL}/horrario/recorrido/${id}`)
  }

  public getRecorridos(){
    return this.http.get<IRecorridoAdmin[]>(`${environment.API_URL}/admin/recorridos`)
  }

  public getReservasDashboard(){
    return this.http.get<IPagination< IReservaDashboard>>(`${environment.API_URL}/reservas`)
  }


  public actualizarEstadoRecorrido(estado: boolean, id:number){
    return this.http.put<boolean>(`${environment.API_URL}/recorridos/eliminar/${id}`, {
      estado: estado

    },
      {headers:{
        'Authorization': `Bearer ${this.userDetails?.token}`,
      }
    }


  )
  }

}
