import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IBoletosAdmin, IVentaAdmin } from '../../types/Boletos';
import { BoletosService } from '../../Services/boletos.service';
import { CargandoComponent } from "../../Componentes/cargando/cargando.component";
import { IPagination } from '../../types/Pagination';
export interface Ventas {
  id: number;
  tipo: string;
  precio: number;
  ventas: number;
}
@Component({
  selector: 'app-dashboard-ventas',
  standalone: true,
  imports: [DashboardContentComponent, CommonModule, RouterLink, CargandoComponent],
  templateUrl: './dashboard-ventas.component.html',
  styleUrl: './dashboard-ventas.component.scss'
})
export class DashboardVentasComponent {
  constructor(private boletosService: BoletosService){}

  ngOnInit(){
    this.boletosService.getAllBoletosAdmin().subscribe(data => {this.bol = data; this.cargandoBoletosExistentes = false});
    this.boletosService.getBoletosVendidos().subscribe(data => {
      this.ventas = data.data; this.cargandoVentas = false
      this.totalBoletosVendidos =  this.ventas.reduce((contador, siguiente) => contador+ siguiente.cantidad,0)

    })

  }

  cargandoBoletosExistentes = true;
  cargandoVentas = true;
  totalBoletosVendidos = 0;

  bol: IBoletosAdmin[] = [];

  ventas: IVentaAdmin[] = []
}
