import { Component, OnInit } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { Router, RouterLink } from '@angular/router';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { MetodoDePagoComponent } from "../../Componentes/modals/metodo-de-pago/metodo-de-pago.component";
import { WarningComponent } from "../../warning/warning.component";
import { CarritoService } from '../../Services/carrito.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IReservaInformacion } from '../../types/Reserva';
import { TarjetaService } from '../../Service/tarjeta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { IVenta, VentaService } from '../../Service/venta.service';
import { IVentaResponse } from '../../types/Venta';

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink, AtrasBtnComponent, ContadorResumenPedidoComponent, CommonModule,IndicadorComponent, AddTarjetaComponent, MetodoDePagoComponent, WarningComponent,FormsModule],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent implements OnInit{

  private subscriptionTour?: Subscription;
  tarjetas: ITarjeta[] = [];
  tarjetaSeleccionada: ITarjeta|null = null;

  constructor( private carritoService: CarritoService, private tarjetasService:TarjetaService, private ventaService: VentaService, private router: Router){}

  ngOnInit(){
    this.tarjetasService.getTarjetas().subscribe(data => this.tarjetas = data);
    console.log(this.carritoService.tours);
    this.subscriptionTour = this.carritoService.toursInfo$.subscribe(data => this.toursInfo = data);

  }


  toursInfo: IReservaInformacion[] = [];

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
    const ventaObject: IVenta = {
      boletos: this.carritoService.boletosVenta,
      recorridos: this.carritoService.tours
    }

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
