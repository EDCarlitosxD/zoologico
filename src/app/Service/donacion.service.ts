import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { IDonacion } from '../pages/pagar-donacion/pagar-donacion.component';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  private headers: HttpHeaders;
  private userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
    this.headers.append('Authorization','Bearer '+ this.userDetails?.token);
  }


  public hacerDonacion(donacion: IDonacion){
    return this.http.post(`${environment.API_URL}/donaciones/guardar`, donacion,{
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    })
  }

}
