import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { EventosPorDia, HorarioTour } from '../types/Horario';
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

  public getHorariosById(id: number){
    return this.http.get<HorarioTour[]>(`${environment.API_URL}/horarrios/${id}`)
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

  public actualizarEstadoHorario(estado: boolean, id:number){
    return this.http.put<boolean>(`${environment.API_URL}/horarios/estado/${id}`, {
      disponible: estado
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
    const hours = Math.floor(duracion / 3600); // Parte entera son las horas
    const minutes = Math.floor((duracion % 3600) / 60); // Fracción convertida a minutos
    const seconds = duracion % 60; // Restante convertido a segundos

    // Formatear con dos dígitos (HH:mm:ss)
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    return formattedTime;
  }

  // public actualizarRecorrido(id: number, recorrido: IRecorridoSave) {
  //   console.log("RECORRIDO",recorrido);

  //   const recoSave = {
  //     ...recorrido
  //   };

  //   // Verificar si img_recorrido es un string y eliminarlo si lo es
     

  //   console.log("recoSave",recoSave);

  //   const formData = new FormData();

  //   // Agregar campos al FormData
  //   Object.keys(recoSave).forEach(key => {
  //     const value = (recoSave as any)[key];
  //     if (value instanceof File) {
  //       formData.append(key, value); // Si es un archivo
  //     } else {
  //       formData.append(key, value?.toString() || ''); // Otros valores como string
  //     }
  //   });
  //   if (typeof recoSave.img_recorrido === 'string') {
  //     recoSave.img_recorrido = undefined // Elimina la propiedad si es un string
  //   }
  //   // Agregar los horarios al FormData
  //   formData.append('horarios', JSON.stringify(recorrido.horarios));

  //   console.log(formData);
    

  //   // Realizar la solicitud HTTP PUT
  //   return this.http.put(`${environment.API_URL}/recorridos/actualizar/${id}`, recoSave);
  // }
//   public actualizarRecorrido(id: number, recorrido: IRecorridoSave) {

//     const recoSave = { ...recorrido };
//     const formData = new FormData();

//     // 🔍 Si `img_recorrido` es un archivo, lo agregamos al FormData
//     if (recoSave.img_recorrido instanceof File) {
//         formData.append('img_recorrido', recoSave.img_recorrido);
//     } else if (typeof recoSave.img_recorrido === 'string' && recoSave.img_recorrido.startsWith('data:image')) {
//         // Si es una imagen en base64, no la enviamos (debe convertirse a archivo antes)
//         console.warn("⚠️ La imagen está en base64, no se enviará.");
//     } else if (typeof recoSave.img_recorrido === 'string') {
//         // Si es una URL existente, enviarla como string en JSON
//         formData.append('img_recorrido_url', recoSave.img_recorrido);
//     }

//     // 🔍 Agregar otros datos al FormData
//     Object.keys(recoSave).forEach(key => {
//         if (key !== 'img_recorrido') {  // Evita duplicar la imagen
//             const value = (recoSave as any)[key];
//             if (value !== undefined && value !== null) {
//                 formData.append(key, value.toString());
//             }
//         }
//     });
//     recoSave.img_recorrido

//     // 🔍 Agregar los horarios al FormData
//     formData.append('horarios', JSON.stringify(recorrido.horarios));

//     // ✅ Mostrar en consola todos los valores de FormData
//     console.log("🔍 FormData enviado:");
//     formData.forEach((value, key) => {
//         console.log(key + ": ", value);
//     });    
//     console.log("🔍 recoSave:", recoSave);
//     // ✅ Realizar la solicitud HTTP PUT con `formData`
//     return this.http.put<IRecorrido>(
//       `${environment.API_URL}/recorridos/actualizar/${id}?_method=PUT`, 
//       recoSave
//     );
// }

public async actualizarRecorrido(id: number, recorrido: IRecorridoSave) {
  const recoSave = { ...recorrido };

  // Si la imagen es un archivo, conviértela a Base64
  if (recoSave.img_recorrido instanceof File) {
      recoSave.img_recorrido = await this.convertirImagenABase64(recoSave.img_recorrido);
  }
  console.log("🔍 Datos antes de enviar:", JSON.stringify(recoSave, null, 2));


  return this.http.put<IRecorrido>(`${environment.API_URL}/recorridos/actualizar/${id}`, recoSave, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userDetails?.token}`,
      }
  });
}


public convertirImagenABase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });
}



}
