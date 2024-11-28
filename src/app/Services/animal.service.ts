import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnimal, IAnimalCard } from '../types/Animales';
import { environment } from '../environment';
import { IPagination } from '../types/Pagination';


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
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');

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

}
