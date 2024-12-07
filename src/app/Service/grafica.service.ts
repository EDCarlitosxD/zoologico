import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUserDetails } from '../utils/getUserDetails';
import { IUserDetails } from '../types/Auth';
import { environment } from '../environment';
import { IVentaResponse } from '../pages/dashboard-ventas/dashboard-ventas.component';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  private headers: HttpHeaders;
  private userDetails: IUserDetails | null;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
    if (this.userDetails?.token) {
      this.headers = this.headers.append('Authorization', 'Bearer ' + this.userDetails.token);
    }
  }


  public obtenerVentasMes(){
    return this.http.get<IVentaResponse>(`${environment.API_URL}/boletosmes`,{headers: this.headers});
  }


}
