import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnimal, IAnimalCard } from '../types/Animales';
import { environment } from '../environment';
import { IPagination } from '../types/Pagination';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');

   }


  getAnimalCard(): Observable<IPagination<IAnimalCard>>{
      return this.http.get<IPagination< IAnimalCard>>(`${environment.API_URL}/animales/card`, {headers: this.headers});
  }

  getAnimal(slug:string): Observable<IAnimal>{
    return this.http.get<IAnimal>(`${environment.API_URL}/animales/${slug}`);
  }

}
