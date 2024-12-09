import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUserDetails } from '../utils/getUserDetails';
import { IUserDetails } from '../types/Auth';
import { environment } from '../environment';
import { IDonacionResponse, IVentaResponseAño, IVentaResponseMes, IVentaResponseSemana } from '../pages/dashboard-ventas/dashboard-ventas.component';

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


  public obtenerVentasBoletosMes(){
    return this.http.get<IVentaResponseMes>(`${environment.API_URL}/boletosmes`,{headers: this.headers});
  }

  public obtenerVentasBoletosSemana(){
    return this.http.get<IVentaResponseSemana>(`${environment.API_URL}/boletossemana`,{headers: this.headers});
  }

  public obtenerVentasBoletosAño(){
    return this.http.get<IVentaResponseAño>(`${environment.API_URL}/boletosyear`,{headers: this.headers});
  }
  public obtenerVentasRecorridosMes(){
    return this.http.get<IVentaResponseMes>(`${environment.API_URL}/recorridosmes`,{headers: this.headers});
  }
  public obtenerVentasRecorridosSemana(){
    return this.http.get<IVentaResponseSemana>(`${environment.API_URL}/recorridosemana`,{headers: this.headers});
  }
  public obtenerVentasRecorridosAño(){
    return this.http.get<IVentaResponseAño>(`${environment.API_URL}/recorridosyear`,{headers: this.headers});
  }

  public obtenerDonacionesMes(){
    return this.http.get<IDonacionResponse>(`${environment.API_URL}/donacionmes`,{headers: this.headers});
  }
  public obtenerDonacionesSemana(){
    return this.http.get<IDonacionResponse>(`${environment.API_URL}/donacionsemana`,{headers: this.headers});
  }
  public obtenerDonacionesAño(){
    return this.http.get<IDonacionResponse>(`${environment.API_URL}/donacionyear`,{headers: this.headers});
  }
}
