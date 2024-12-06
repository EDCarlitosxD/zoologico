import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReserva } from '../types/Reserva';
import { IBoleto, IBoletoVenta } from '../types/Boletos';
import { environment } from '../environment';
import { IUserDetails } from '../types/Auth';
import { getUserDetails } from '../utils/getUserDetails';

export interface IVenta{
  recorridos: IReserva[],
  boletos: IBoletoVenta[],
}


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  userDetails: IUserDetails | null;

  constructor(private http: HttpClient) {
    this.userDetails = getUserDetails();
   }


  realizarVenta(venta: IVenta){
    return this.http.post(`${environment.API_URL}/venta`, venta, {
      headers: {
        'Authorization': `Bearer ${this.userDetails?.token}`,
    }
    });
  }

}
