import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoleto, IBoletoVenta } from '../../types/Boletos';
import { IRecorrido } from '../../types/Recorridos';
import { IReserva, IReservaInformacion } from '../../types/Reserva';
import { RecorridoService } from '../../Services/recorrido.service';
import { BoletosService } from '../../Services/boletos.service';
import { CarritoService } from '../../Services/carrito.service';
import { MembresiasService } from '../../Services/membresias.service';
import { IMembresia } from '../../types/Membresia';
import { WarningComponent } from '../warning/warning.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [WarningComponent, RouterOutlet, RouterLink,CommonModule, NgIf],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

    constructor(private recorridoService: RecorridoService, private boletosService: BoletosService, private carritoService: CarritoService, private membresiaService: MembresiasService) {
      this.tours = this.carritoService.toursInfo;
      this.boletos = this.carritoService.boletosInformacion;
      this.boletosVenta = this.carritoService.boletosVenta;
      console.log(this.boletos);
  
     }
  
     private subscriptioTour?: Subscription;
     private subscriptioBoletos?: Subscription;
     private subscriptionBoletosVenta?: Subscription;
     
  
    boletos: IBoleto[]= []
    recorridos: IRecorrido[] = []
    boletosVenta: IBoletoVenta[] = []
    reservas: IReserva[] = []
    tours;
    toursInfo: IReservaInformacion[] = [];
  


    totalRecorridos = 0;
    totalBoletos = 0;
  
  
    ngOnInit(){
      this.subscriptioTour = this.carritoService.toursInfo$.subscribe(data => {
        this.toursInfo = data
        this.totalRecorridos = this.toursInfo.reduce((acumulador, siguiente) => acumulador+ (siguiente.tour.precio * siguiente.reserva.cantidad!),0)
        console.log(this.totalRecorridos);
  
      });
      this.subscriptioTour = this.carritoService.tours$.subscribe(data => {
        this.reservas = data
      }
      );
      this.subscriptioBoletos = this.carritoService.boletoInformacion$.subscribe(data => {this.boletos = data
        console.log(data);
        
      });
      this.subscriptionBoletosVenta = this.carritoService.boletoVenta$.subscribe(data => {
        this.boletosVenta = data;
        this.totalBoletos = this.boletos.reduce((acumulador, siguiente,index) => acumulador + (siguiente.precio * this.boletosVenta[index].cantidad) ,0);
      });
  
    }
  
    plusBoleto(id: number){
      this.carritoService.aumentarBoleto(id);
    }
  
    minusBoleto(id: number){
      this.carritoService.decrementarBoleto(id);
    }
  
    ngOnDestroy() {
      // Limpiamos la suscripción para evitar fugas de memoria
      if (this.subscriptioTour) {
        this.subscriptioTour.unsubscribe();
      }
  
      if (this.subscriptioBoletos) {
        this.subscriptioBoletos.unsubscribe();
      }
  
      if (this.subscriptionBoletosVenta) {
        this.subscriptionBoletosVenta.unsubscribe();
      }
  
    }
  
  
    eliminarCarrito($idHorarrio: number){
      this.carritoService.eliminarCarritoReserva($idHorarrio);
      alert("holamundo")
    }
  
  
}
