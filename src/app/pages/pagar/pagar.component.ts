import { Component, OnInit } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { Router, RouterLink } from '@angular/router';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { MetodoDePagoComponent } from "../../Componentes/modals/metodo-de-pago/metodo-de-pago.component";
import { WarningComponent } from "../../Componentes/warning/warning.component";
import { CarritoService } from '../../Services/carrito.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IReserva, IReservaInformacion } from '../../types/Reserva';
import { TarjetaService } from '../../Service/tarjeta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { IVenta, VentaService } from '../../Service/venta.service';
import { IVentaResponse } from '../../types/Venta';
import { IBoleto, IBoletoVenta } from '../../types/Boletos';
import { ITour } from '../../types/Tour';

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink, AtrasBtnComponent, ContadorResumenPedidoComponent, CommonModule,IndicadorComponent, AddTarjetaComponent, MetodoDePagoComponent, WarningComponent,FormsModule],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent implements OnInit{

  private subscriptionTour?: Subscription;
  private subscriptioBoletos? : Subscription;
  private subscriptionBoletosVenta? : Subscription;
  private subscriptionTourVenta?: Subscription;
  tarjetas: ITarjeta[] = [];
  tarjetaSeleccionada: ITarjeta|null = null;
  boletos: IBoleto[] = [];
  boletosVenta: IBoletoVenta[] = []
  tours: IReserva[] = [];
  toursInfo: IReservaInformacion[] = [];
  totalBoletos = 0;
  totalRecorridos = 0;

  constructor( private carritoService: CarritoService, private tarjetasService:TarjetaService, private ventaService: VentaService, private router: Router){}

  ngOnInit(){
    this.tarjetasService.getTarjetas().subscribe(data => this.tarjetas = data);
    console.log(this.carritoService.tours);
    this.subscriptionTour = this.carritoService.toursInfo$.subscribe(data => {

      this.toursInfo = data
      this.totalRecorridos = this.toursInfo.reduce((acumulador, siguiente) => acumulador+ (siguiente.tour.precio * siguiente.reserva.cantidad_personas!),0)
      console.log(this.totalRecorridos);

    });
    this.subscriptionTourVenta = this.carritoService.tours$.subscribe(data => {
      this.tours = data

    }
    );
    this.subscriptioBoletos = this.carritoService.boletoInformacion$.subscribe(data => this.boletos = data);
    this.subscriptionBoletosVenta = this.carritoService.boletoVenta$.subscribe(data => {
      this.boletosVenta = data;
      this.totalBoletos = this.boletos.reduce((acumulador, siguiente,index) => acumulador + (siguiente.precio * this.boletosVenta[index].cantidad) ,0);
    });

  }



  eliminarTarjeta(id: number){
    this.tarjetasService.eliminar(id).subscribe(data => {
      this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id != id);
    });
  }


  eliminarCarritoTour(idHorarrio: number){
    this.carritoService.eliminarCarritoReserva(idHorarrio);
  }


  onTarjetaGuardada(tarjeta: ITarjeta){
    this.tarjetas.push(tarjeta);
  }



  comprar(){

    if(!this.tarjetaSeleccionada){
      alert("Selecciona una tarjeta")
      return;
    }
    const eliminarBoletosSinCantidad = this.carritoService.boletosVenta.filter(boleto => boleto.cantidad > 0);

    const ventaObject: IVenta = {
      boletos: eliminarBoletosSinCantidad,
      recorridos: this.carritoService.tours
    }

    console.log(ventaObject);


    this.router.navigate(['/loading']).then(() => {
      this.ventaService.realizarVenta(ventaObject).subscribe({
        next: (data) => {
          console.log('SE LOGRO LA VENTA!!!!!');
          console.log(data);

          // Guarda los datos de la venta y navega a la página "Venta hecha"
          this.router.navigate(['/comprar/pagar/gracias'], {
            state: { venta: data as IVentaResponse, tarjeta: this.tarjetaSeleccionada } // Pasar los datos como `state`
          });
          this.carritoService.clearCarrito()
        },
        error: (err) => {
          console.error('Error al realizar la venta:', err);
          // Manejar errores si es necesario
        }
      });
    });

  }
}
