import { Injectable } from '@angular/core';
import { IReserva, IReservaInformacion } from '../types/Reserva';
import { IBoleto } from '../types/Boletos';
import { ITour } from '../types/Tour';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private STORAGE_RESERVAS = 'reservas';
  private STORAGE_BOLETOS = 'reservas';
  private STORAGE_RESERVAS_INFORMACION = 'reservas';


  boletos: IBoleto[] = [];
  tours: IReserva[] = [];
  toursInfo: IReservaInformacion[] = []





  constructor() {
    const savedReservas = localStorage.getItem(this.STORAGE_RESERVAS);
    const savedReservasInformacion = localStorage.getItem(this.STORAGE_RESERVAS_INFORMACION)
    const savedBoletos = localStorage.getItem(this.STORAGE_BOLETOS);

    if (savedReservas) {
      this.tours = JSON.parse(savedReservas);
    }
    if (savedReservasInformacion) {
      this.toursInfo = JSON.parse(savedReservasInformacion);
    }
    if (savedBoletos) {
      this.boletos = JSON.parse(savedBoletos);
    }
    console.log(this.tours);


  }



  addReserva(reserva: IReserva, informacionFront: IReservaInformacion){
    this.tours.push(reserva);
    this.toursInfo.push(informacionFront);
    this.actualizarStorageReserva()
  }



  actualizarStorageReserva(){
    localStorage.setItem(this.STORAGE_RESERVAS, JSON.stringify(this.tours));
    localStorage.setItem(this.STORAGE_RESERVAS_INFORMACION, JSON.stringify(this.toursInfo));
  }

}
