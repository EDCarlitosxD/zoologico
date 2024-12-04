import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnimal, IAnimalCard } from '../types/Animales';
import { environment } from '../environment';
import { IPagination } from '../types/Pagination';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';


export interface IFiltroAnimalesCard{
  datomin: string | null ,
  tipo: string | null
  page: number
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private headers: HttpHeaders;
  private userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
   }


  getAnimalCard(filtros: IFiltroAnimalesCard = {page: 1,
    datomin: null,
    tipo: null
  }): Observable<IPagination<IAnimalCard>>{
    let params = new HttpParams();

    // Agregar los filtros como query parameters solo si tienen valor
    if (filtros.page) {
      params = params.set('page', filtros.page.toString());
    }
    if (filtros.datomin) {
      params = params.set('datomin', filtros.datomin);
    }
    if (filtros.tipo) {
      params = params.set('tipo', filtros.tipo);
    }

    return this.http.get<IPagination< IAnimalCard>>(`${environment.API_URL}/animales/card`, {headers: this.headers, params});
  }

  getAnimal(slug:string): Observable<IAnimal>{
    return this.http.get<IAnimal>(`${environment.API_URL}/animales/${slug}`);
  }

  getAll(){
    return this.http.get<IAnimal[]>(`${environment.API_URL}/animales`);
  }

  updateEstado(id: number, estado: boolean){
    return this.http.put(`${environment.API_URL}/animales/eliminar/${id}`,{
        'estado': estado
    })
  }


  guardarAnimal(animal:IAnimal){

    const formData = new FormData();

    // Agregar campos al FormData
    Object.keys(animal).forEach(key => {
      const value = (animal as any)[key];
      if (value instanceof File) {
        formData.append(key, value); // Si es un archivo
      } else {
        formData.append(key, value?.toString() || ''); // Otros valores como string
      }
    });

    return this.http.post<IAnimal>(`${environment.API_URL}/animales`,formData,
      {
        headers: {
          'Authorization': `Bearer ${this.userDetails?.token}`,
          // 'Content-Type': 'multipart/form-data'
      }
      }
    );
  }


  editarAnimal(animal: IAnimal, id: number){
    const formData = new FormData();

    console.log(animal);

    // Agregar campos al FormData
    Object.keys(animal).forEach(key => {
      const value = (animal as any)[key];
      if (value instanceof File) {
        formData.append(key, value); // Si es un archivo
      } else {
        formData.append(key, value?.toString() || ''); // Otros valores como string
      }
    });

    if(typeof formData.get('imagen_principal') === 'string') formData.delete('imagen_principal');
    if(typeof formData.get('imagen_secundaria') === 'string') formData.delete('imagen_secundaria');
    if(typeof formData.get('img_ubicacion') === 'string') formData.delete('img_ubicacion');


    return this.http.post<IAnimal>(`${environment.API_URL}/animales/actualizar/${id}?_method=PUT`,formData,
      {
        headers: {
          'Authorization': `Bearer ${this.userDetails?.token}`,
          //  'Content-Type': 'multipart/form-data'
      }
      }
    );
  }

}
