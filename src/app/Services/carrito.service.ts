import { Injectable } from '@angular/core';
import { IReserva, IReservaInformacion } from '../types/Reserva';
import { IBoleto, IBoletoVenta } from '../types/Boletos';
import { ITour } from '../types/Tour';
import { BehaviorSubject } from 'rxjs';
import { BoletosService } from './boletos.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private STORAGE_RESERVAS = 'reservas';
  private STORAGE_BOLETOS = 'boletos';
  private STORAGE_BOLETOS_INFORMACION = 'boletos_informacion';
  private STORAGE_RESERVAS_INFORMACION = 'reservas_informacion';

  private tourSubjet = new BehaviorSubject<IReserva[]>([]);
  private tourInfoSubject = new BehaviorSubject<IReservaInformacion[]>([]);
  private boletoSubject = new BehaviorSubject<IBoletoVenta[]>([])
  private boletoInformacionSubject = new BehaviorSubject<IBoleto[]>([])

  tours$ = this.tourSubjet.asObservable();
  toursInfo$ = this.tourInfoSubject.asObservable();
  boletoVenta$ = this.boletoSubject.asObservable();
  boletoInformacion$ = this.boletoInformacionSubject.asObservable();

  tours: IReserva[] = [];
  toursInfo: IReservaInformacion[] = [];
  boletosVenta: IBoletoVenta[] = []
  boletosInformacion: IBoleto[] = [];




  constructor(private boletoService: BoletosService) {
    const savedReservas = localStorage.getItem(this.STORAGE_RESERVAS);
    const savedReservasInformacion = localStorage.getItem(this.STORAGE_RESERVAS_INFORMACION)
    const savedBoletos = localStorage.getItem(this.STORAGE_BOLETOS_INFORMACION);
    const savedBoletosVenta = localStorage.getItem(this.STORAGE_BOLETOS)
    if (savedReservas) {
      this.tours = JSON.parse(savedReservas);
      this.tourSubjet.next([...this.tours]);
    }
    if (savedReservasInformacion) {
      this.toursInfo = JSON.parse(savedReservasInformacion);
      this.tourInfoSubject.next([...this.toursInfo]);
    }
    if (savedBoletos && savedBoletosVenta) {
      this.boletosInformacion = JSON.parse(savedBoletos);
      this.boletosVenta = JSON.parse(savedBoletosVenta);
      this.boletoSubject.next([...this.boletosVenta]);
      this.boletoInformacionSubject.next([...this.boletosInformacion]);

    } else {
      this.tourSubjet.next(this.tours);
      this.tourInfoSubject.next(this.toursInfo);

      this.boletoService.getAllBoletos(1).subscribe(data => {
        this.boletosInformacion = data;

        this.boletosVenta = []
        this.boletosVenta = this.boletosInformacion.map(boleto => ({
          id_boleto: boleto.id,
          cantidad: 0,
        }) as IBoletoVenta)

        this.boletoSubject.next([...this.boletosVenta]);
        this.boletoInformacionSubject.next([...this.boletosInformacion]);
        this.actualizarStorageBoletos();
      })
    }






  }



  addReserva(reserva: IReserva, informacionFront: IReservaInformacion) {
    this.tours.push(reserva);
    this.toursInfo.push(informacionFront);
    // Emitir el nuevo estado
    this.tourSubjet.next([...this.tours]);  // Usando el spread operator para evitar la referencia directa
    this.tourInfoSubject.next([...this.toursInfo]);
    this.actualizarStorageReserva()
  }


  aumentarBoleto(id:number) {
    this.boletosVenta.find(boleto => boleto.id_boleto == id)!.cantidad++;

    this.boletoSubject.next([...this.boletosVenta]);

    this.actualizarStorageBoletos();
  }

  decrementarBoleto(id:number) {
    this.boletosVenta.find(boleto => boleto.id_boleto == id)!.cantidad--;

    this.boletoSubject.next([...this.boletosVenta]);

    this.actualizarStorageBoletos();
  }

  aumentarPersonasTour(idHorarrio: number){

    console.log('horarioIDi',idHorarrio);
    console.log(this.toursInfo);

    const tour = this.tours.find(tour => tour.id_horario_recorrido == idHorarrio);


    if (tour) {
      // Incrementar la cantidad de personas en el tour encontrado
      tour.cantidad = (tour.cantidad || 0) + 1;

      // Buscar el objeto correspondiente en toursInfo y sincronizar la cantidad de personas
      const tourInfo = this.toursInfo.find(tourInfo => tourInfo.reserva.id_horario_recorrido == idHorarrio);

      if (tourInfo) {
        tourInfo.reserva.cantidad = tour.cantidad;
      }
    }



    this.tourSubjet.next([...this.tours]);
    this.tourInfoSubject.next([...this.toursInfo]);
    this.actualizarStorageReserva();
  }

  decrementarPersonaTour(idHorarrio: number){
    const tour = this.tours.find(tour => tour.id_horario_recorrido == idHorarrio)
    if (tour) {
      // Incrementar la cantidad de personas en el tour encontrado
      tour.cantidad = (tour.cantidad || 0) - 1;

      // Buscar el objeto correspondiente en toursInfo y sincronizar la cantidad de personas
      const tourInfo = this.toursInfo.find(tourInfo => tourInfo.reserva.id_horario_recorrido == idHorarrio);

      if (tourInfo) {
        tourInfo.reserva.cantidad = tour.cantidad;
      }
    }

    this.tourSubjet.next([...this.tours]);
    this.tourInfoSubject.next([...this.toursInfo]);
    this.actualizarStorageReserva();

  }



  private  actualizarStorageReserva() {
    localStorage.setItem(this.STORAGE_RESERVAS, JSON.stringify(this.tours));
    localStorage.setItem(this.STORAGE_RESERVAS_INFORMACION, JSON.stringify(this.toursInfo));
  }

  private actualizarStorageBoletos() {
    localStorage.setItem(this.STORAGE_BOLETOS, JSON.stringify(this.boletosVenta));
    localStorage.setItem(this.STORAGE_BOLETOS_INFORMACION, JSON.stringify(this.boletosInformacion));

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
    this.boletosVenta = this.boletosInformacion.map(boleto => ({
      cantidad: 0,
      id_boleto: boleto.id
    }) as IBoletoVenta)

    this.tourSubjet.next(this.tours);
    this.tourInfoSubject.next(this.toursInfo);
    this.boletoSubject.next(this.boletosVenta)

    this.actualizarStorageReserva();
    this.actualizarStorageBoletos();

  }


}
