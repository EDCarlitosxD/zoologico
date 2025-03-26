import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';
import { IInsignia } from '../types/Insignias';

@Injectable({
  providedIn: 'root'
})
export class InsigniaService {

  private headers: HttpHeaders;
    private userDetails: IUserDetails | null;
    constructor(private http: HttpClient) {
      this.headers = new HttpHeaders().append('accept', 'application/json');
      this.userDetails = getUserDetails();
    }
    public getAll(){
        return this.http.get<IInsignia[]>(`${environment.API_URL}/insignias`)
      }
  public actualizarEstado(estado: boolean,id:number){
      return this.http.put<boolean>(`${environment.API_URL}/insignias/eliminar/${id}`,{estado},{
        headers: {
          'Authorization': `Bearer ${this.userDetails?.token}`,
        }
      })
    }

      guardarInsignia(insignia: IInsignia) {
    
        const formData = new FormData();
    
        console.log(insignia);
        // Agregar campos al FormData
        Object.keys(insignia).forEach(key => {
          const value = (insignia as any)[key];
          if (value instanceof File) {
            formData.append(key, value); // Si es un archivo
          } else {
            formData.append(key, value?.toString() || ''); // Otros valores como string
          }
        });
    
        return this.http.post<IInsignia>(`${environment.API_URL}/insignias/guardar`, insignia
        );
      }

      getById(id: number) {
        return this.http.get<IInsignia>(`${environment.API_URL}/insignias/${id}`);
      }

      editarInsignia(insignia: IInsignia, id: number) {

    
        console.log(insignia);
    
    
    
        return this.http.put<IInsignia>(`${environment.API_URL}/insignias/actualizar/${id}`, insignia,
          {
            headers: {
              'Authorization': `Bearer ${this.userDetails?.token}`,
              //  'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
}
