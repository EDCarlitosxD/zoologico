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
    this.boletoService.getAllBoletos(1).subscribe(data => {
      this.boletosInformacion = data;
      console.log("boletos DATAA",this.boletosInformacion);
      

      this.boletosVenta = []
      this.boletosVenta = this.boletosInformacion.map(boleto => ({
        id_boleto: boleto.id,
        cantidad: 0,
      }) as IBoletoVenta)

      this.boletoSubject.next([...this.boletosVenta]);
      this.boletoInformacionSubject.next([...this.boletosInformacion]);
      this.actualizarStorageBoletos();
    })
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
        console.log("boletos DATAA",this.boletosInformacion);
        

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
    let cantidad = this.boletosVenta.find(boleto => boleto.id_boleto == id)!
    if(cantidad.cantidad === 0)return;
    cantidad.cantidad--;
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




  private _tours: any[] = [];
  private _boletosVenta: any[] = [];
  private _cantidadTotal = new BehaviorSubject<number>(0);
  private _precioTotal = new BehaviorSubject<number>(0);

  // Getter para tours con descuento aplicado
  get tourss() {
    // Aplicar descuento de membresía si existe
    return this.aplicarDescuentoMembresia(this._tours);
  }

  // Getter para los boletos originales
  get boletosVentaa() {
    return this._boletosVenta;
  }

  get cantidadTotal() {
    return this._cantidadTotal.asObservable();
  }

  get precioTotal() {
    return this._precioTotal.asObservable();
  }

  // Método para aplicar descuento de membresías
  private aplicarDescuentoMembresia(tours: any[]): any[] {
    // Obtener datos del usuario y verificar si tiene membresía
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const membership = userDetails?.membership?.membershipDetails;
    
    // Si no hay membresía o no hay descuento de tours, devolver los tours sin cambios
    if (!membership || !membership.descuento_tours || membership.descuento_tours <= 0) {
      return tours;
    }

    // Aplicar descuento a cada tour
    return tours.map(tour => {
      // Calcular el precio con descuento
      const descuentoPorcentaje = membership.descuento_tours;
      const precioOriginal = tour.precio;
      const descuento = (precioOriginal * descuentoPorcentaje) / 100;
      const precioConDescuento = precioOriginal - descuento;
      
      // Devolver el tour con el precio actualizado y la información del descuento
      return {
        ...tour,
        precioOriginal: precioOriginal, // Guardar precio original para referencia
        precio: precioConDescuento, // Actualizar el precio con descuento
        descuentoAplicado: {
          porcentaje: descuentoPorcentaje,
          valorDescuento: descuento,
          tipoMembresia: membership.tipo_membresia
        }
      };
    });
  }

  // Método para calcular el total general (con descuentos aplicados)
  calcularTotal() {
    // Calcular total de boletos
    const totalBoletos = this._boletosVenta.reduce((total, boleto) => {
      return total + (boleto.precio * boleto.cantidad);
    }, 0);
    
    // Calcular total de tours (con descuento si aplica)
    const toursConDescuento = this.tourss; // Ya tiene los descuentos aplicados
    const totalTours = toursConDescuento.reduce((total, tour) => {
      return total + (tour.precio * tour.cantidad);
    }, 0);
    
    // Calcular cantidad total de items
    const cantidadItems = this._boletosVenta.reduce((total, boleto) => {
      return total + boleto.cantidad;
    }, 0) + this._tours.reduce((total, tour) => {
      return total + tour.cantidad;
    }, 0);
    
    this._cantidadTotal.next(cantidadItems);
    this._precioTotal.next(totalBoletos + totalTours);
  }

  // Resto de métodos del servicio...
  // ...

  clearCarritoo() {
    this._tours = [];
    this._boletosVenta = [];
    this._cantidadTotal.next(0);
    this._precioTotal.next(0);
  }

}
