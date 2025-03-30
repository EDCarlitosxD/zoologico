import { Injectable } from '@angular/core';
import { IUserDetails } from '../types/Auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUserDetails } from '../utils/getUserDetails';
import { environment } from '../environment';
import { IMembresia } from '../types/Membresia';

@Injectable({
  providedIn: 'root',
})
export class MembresiasService {
  private userDetails: IUserDetails | null;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
  }
  public getAll() {
    return this.http.get<IMembresia[]>(`${environment.API_URL}/membresias`);
  }
  public getById(id: number) {
    return this.http.get<IMembresia>(`${environment.API_URL}/membresias/${id}`);
  }
  public create(membresia: IMembresia) {
    return this.http.post<IMembresia>(
      `${environment.API_URL}/membresias`,
      membresia,
      { headers: this.headers }
    );
  }
  public update(membresia: IMembresia, id: number) {
    return this.http.put<IMembresia>(
      `${environment.API_URL}/membresias/actualizar/${id}`,
      membresia,
      { headers: this.headers }
    );
  }
  public actualizarEstado(id: number, estado: boolean) {
    return this.http.put<IMembresia>(
      `${environment.API_URL}/membresias/eliminar/${id}`,
      { headers: this.headers, estado: estado }
    );
  }
}
