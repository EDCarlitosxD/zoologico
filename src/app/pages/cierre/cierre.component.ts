import { Component } from '@angular/core';
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { Router, RouterLink } from '@angular/router';
import { IVenta } from '../../Service/venta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { CommonModule } from '@angular/common';
import { IVentaResponse } from '../../types/Venta';

@Component({
  selector: 'app-cierre',
  standalone: true,
  imports: [RouterLink, IndicadorComponent, CommonModule],
  templateUrl: './cierre.component.html',
  styleUrl: './cierre.component.scss'
})
export class CierreComponent {

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { venta: IVentaResponse; tarjeta: ITarjeta }; // Tipar explícitamente el state

    this.venta = state?.venta;
    this.tarjeta = state?.tarjeta;
  }

  venta: IVentaResponse;
  tarjeta: ITarjeta;

  get totalRecorridos() {
    return this.venta.recorridos.reduce((acumulador, recorrido) => acumulador + recorrido.total_recorrido, 0);
  }
}
