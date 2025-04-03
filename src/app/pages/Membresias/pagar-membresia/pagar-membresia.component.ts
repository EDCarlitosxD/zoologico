import { Component, OnInit } from '@angular/core';
import { AtrasBtnComponent } from '../../../Componentes/atras-btn/atras-btn.component';
import { ContadorResumenPedidoComponent } from '../../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component';
import { IndicadorComponent } from '../../../Componentes/indicador/indicador.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddTarjetaComponent } from '../../../Componentes/modals/add-tarjeta/add-tarjeta.component';
import { WarningComponent } from '../../../Componentes/warning/warning.component';
import { CarritoService } from '../../../Services/carrito.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IReserva, IReservaInformacion } from '../../../types/Reserva';
import { TarjetaService } from '../../../Service/tarjeta.service';
import { ITarjeta } from '../../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { IVenta, VentaService } from '../../../Service/venta.service';
import { IVentaResponse } from '../../../types/Venta';
import { IBoleto, IBoletoVenta } from '../../../types/Boletos';
import {
  IMembresia,
  IMembresiaShort,
  IMembresiaUser,
} from '../../../types/Membresia';
import { getUserDetails } from '../../../utils/getUserDetails';
import { IUserDetails } from '../../../types/Auth';
import { MembresiasService } from '../../../Services/membresias.service';

@Component({
  selector: 'app-pagar-membresia',
  standalone: true,
  imports: [
    AddTarjetaComponent,
    AtrasBtnComponent,
    RouterLink,
    FormsModule,
    CommonModule,
    ContadorResumenPedidoComponent,
    IndicadorComponent,
    WarningComponent,
  ],
  templateUrl: './pagar-membresia.component.html',
  styleUrl: './pagar-membresia.component.scss',
})
export class PagarMembresiaComponent implements OnInit {
  private subscriptionTour?: Subscription;
  private subscriptioBoletos?: Subscription;
  private subscriptionBoletosVenta?: Subscription;
  private subscriptionTourVenta?: Subscription;
  tarjetas: ITarjeta[] = [];
  tarjetaSeleccionada: ITarjeta | null = null;
  m: IMembresiaShort = {
    id: 0,
    nombre: '',
    precio: 5,
    imagen: '',
  };

  mUser: IMembresiaUser = {
    id_membresia: 0,
    id_usuario: 0,
    meses: 1,
    precio_total: 0,
    img: ''
  };


  userDetails: IUserDetails | null;
  constructor(
    private tarjetasService: TarjetaService,
    private ventaService: VentaService,
    private router: Router,
    private membresiasService: MembresiasService,
    private activateRoute: ActivatedRoute
  ) {
    this.userDetails = getUserDetails();
  }

  ngOnInit() {
    this.tarjetasService
      .getTarjetas()
      .subscribe((data) => (this.tarjetas = data));
      this.mUser = this.membresiasService.getMembresia();
      console.log('membresia PAGAR',this.mUser );
      this.mUser = this.membresiasService.getMembresia();
      this.membresiasService.getById(this.mUser.id_membresia).subscribe((data) => {
        (this.m = data)
      });
  }

  eliminarTarjeta(id: number) {
    const confirmacion = window.confirm(
      '¿Estas seguro de eliminar la tarjeta?'
    );
    if (!confirmacion) return;
    this.tarjetasService.eliminar(id).subscribe({
      next: () => {
        this.tarjetas = this.tarjetas.filter((tarjeta) => tarjeta.id !== id);
        alert('✅ Tarjeta eliminada correctamente.');
      },
      error: (err) => {
        alert(
          '❌ Error al eliminar la tarjeta: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }

  onTarjetaGuardada(tarjeta: ITarjeta) {
    this.tarjetas.push(tarjeta);
  }

  comprar() {
    if (!this.tarjetaSeleccionada) {
      alert('Selecciona una tarjeta');
      return;
    }
    if(this.mUser.meses < 1 || this.mUser.meses > 12){
      alert('Selecciona una cantidad correcta de meses (minimo 1 y maximo 12)');
      return;
    }
    const ventaObject: IMembresiaUser = {
      id_membresia: this.m.id,
      id_usuario: this.userDetails!.user.id!,
      meses: this.mUser.meses,
      precio_total: this.m.precio * this.mUser.meses,
      img: this.m.imagen
    };

    console.log(ventaObject);
    this.membresiasService.setCompra(ventaObject);
    this.router.navigate(['/loading']).then(() => {
      this.membresiasService.realizarVenta(ventaObject).subscribe({
        next: (data) => {
          console.log('SE LOGRO LA VENTA!!!!!');
          console.log(data);

          // Guarda los datos de la venta y navega a la página "Venta hecha"
          this.router.navigate(['/membresias/pagar/gracias/'], {
            state: {
              venta: data as IVentaResponse,
              tarjeta: this.tarjetaSeleccionada,
            }, // Pasar los datos como `state`
          });
        },
        error: (err) => {
          console.error('Error al realizar la venta:', err);
          // Manejar errores si es necesario
        },
      });
    });
  }
}
