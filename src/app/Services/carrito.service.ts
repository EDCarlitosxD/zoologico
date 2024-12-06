import { Injectable } from '@angular/core';
import { IReserva, IReservaInformacion } from '../types/Reserva';
import { IBoleto } from '../types/Boletos';
import { ITour } from '../types/Tour';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private STORAGE_RESERVAS = 'reservas';
  private STORAGE_BOLETOS = 'boletos';
  private STORAGE_RESERVAS_INFORMACION = 'reservas_informacion';

  private tourSubjet = new BehaviorSubject<IReserva[]>([]);
  private tourInfoSubject = new BehaviorSubject<IReservaInformacion[]>([]);


  boletos: IBoleto[] = [];
  tours$ = this.tourSubjet.asObservable();
  toursInfo$ = this.tourInfoSubject.asObservable();

  tours: IReserva[] = [];
  toursInfo: IReservaInformacion[] = [];




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

    this.tourSubjet.next(this.tours);
    this.tourInfoSubject.next(this.toursInfo);
  }



  addReserva(reserva: IReserva, informacionFront: IReservaInformacion) {
    this.tours.push(reserva);
    this.toursInfo.push(informacionFront);
    // Emitir el nuevo estado
    this.tourSubjet.next([...this.tours]);  // Usando el spread operator para evitar la referencia directa
    this.tourInfoSubject.next([...this.toursInfo]);
    this.actualizarStorageReserva()
  }


  addBoleto(boleto: IBoleto) {
    this.boletos.push(boleto);
    this.actualizarStorageBoletos();
  }

  private actualizarStorageReserva() {
    localStorage.setItem(this.STORAGE_RESERVAS, JSON.stringify(this.tours));
    localStorage.setItem(this.STORAGE_RESERVAS_INFORMACION, JSON.stringify(this.toursInfo));
  }

  private actualizarStorageBoletos() {
    localStorage.setItem(this.STORAGE_BOLETOS, JSON.stringify(this.boletos));

  }


  eliminarCarritoReserva(idHorarioRecorrido: number) {
    this.tours = this.tours.filter(tour => tour.id_horario_recorrido != idHorarioRecorrido);
    this.toursInfo = this.toursInfo.filter(tour => tour.horario.id != idHorarioRecorrido);

    this.tourSubjet.next(this.tours);
    this.tourInfoSubject.next(this.toursInfo);
    this.actualizarStorageReserva();
  }


  clearCarrito() {
    this.tours = [];
    this.toursInfo = []
    this.boletos = [];

    this.tourSubjet.next(this.tours);
    this.tourInfoSubject.next(this.toursInfo);

    this.actualizarStorageReserva();
    this.actualizarStorageBoletos();

  }


}
