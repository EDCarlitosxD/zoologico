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
import { ITourGuardar } from '../types/Tour';
import { IRecorridoSave } from '../paages/creat-recorrido/creat-recorrido.component';

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

    guardarRecorrido(recorrido: IRecorridoSave) {
      const recoSave = {
        ...recorrido
      }

      recoSave.duracion = this.formatDurationToTime(recoSave.duracion as number);

      console.log(recoSave);

    const formData = new FormData();

    // Agregar campos al FormData
    Object.keys(recoSave ).forEach(key => {
      const value = (recoSave   as any)[key];
      if (value instanceof File) {
        formData.append(key, value); // Si es un archivo
      } else {
        formData.append(key, value?.toString() || ''); // Otros valores como string
      }
    });

    formData.append('horarios',JSON.stringify(recorrido.horarios));

    console.log(formData);


    return this.http.post<ITourGuardar>(`${environment.API_URL}/recorridos/guardar`, formData,
      {
        headers: {
          'Authorization': `Bearer ${this.userDetails?.token}`,
          // 'Content-Type': 'multipart/form-data'
        }
      }
    );
  }

  getById($id:number){
    return this.http.get<IRecorrido>(`${environment.API_URL}/recorridos/${$id}`)
  }



   formatDurationToTime(duracion: number): string {
    // Calcular las horas, minutos y segundos
    const hours = Math.floor(duracion); // Parte entera son las horas
    const minutes = Math.floor((duracion % 1) * 60); // Fracción convertida a minutos
    const seconds = Math.round((((duracion % 1) * 60) % 1) * 60); // Restante convertido a segundos

    // Formatear con dos dígitos (HH:mm:ss)
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    return formattedTime;
  }

}
