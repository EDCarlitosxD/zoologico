import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { IFormContacto } from '../pages/contacto/contacto.component';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }


  public enviarMensaje(mensaje: IFormContacto){
    return this.http.post<{message: string}>(`${environment.API_URL}/mensajeusuario`, mensaje)
  }
}
