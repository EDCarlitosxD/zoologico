import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IBoletosAdmin, IVentaAdmin } from '../../types/Boletos';
import { BoletosService } from '../../Services/boletos.service';
import { CargandoComponent } from "../../Componentes/cargando/cargando.component";
import { IPagination } from '../../types/Pagination';
import { Chart, registerables } from 'chart.js';
import { BarChartComponent, IDataGraficsBar } from "../../Componentes/bar-chart/bar-chart.component";
import { GraficaService } from '../../Service/grafica.service';
export interface Ventas {
  id: number;
  tipo: string;
  precio: number;
  ventas: number;
}
export interface IVentaItem {
  id: number;
  titulo: string;
  cantidad: string; // Es mejor convertir a número si se usará para cálculos.
}

export interface IVentaResponseMes {
  VentaMes: Record<string, IVentaItem[]>; // Clave numérica como string y un array de IVentaMes
  cantidad_total: string; // También mejor convertir a número
}

export interface IVentaResponseSemana {
  VentaSemana: Record<string, IVentaItem[]>; // Clave numérica como string y un array de IVentaMes
  cantidad_total: string; // También mejor convertir a número
}


export interface IVentaResponseAño {
  VentaYear: Record<string, IVentaItem[]>; // Clave numérica como string y un array de IVentaMes
  cantidad_total: string; // También mejor convertir a número
}


export interface IDonacionResponse {
  donacion: { id:number, monto: string}[],
  promedio: number,
  total: number
}


@Component({
  selector: 'app-dashboard-ventas',
  standalone: true,
  imports: [DashboardContentComponent, CommonModule, RouterLink, CargandoComponent, BarChartComponent],
  templateUrl: './dashboard-ventas.component.html',
  styleUrl: './dashboard-ventas.component.scss'
})


export class DashboardVentasComponent {
  constructor(private boletosService: BoletosService, private graficaService: GraficaService){

    Chart.register(...registerables);

  }

  ngOnInit(){
    this.boletosService.getAllBoletosAdmin().subscribe(data => {this.bol = data; this.cargandoBoletosExistentes = false});
    this.boletosService.getBoletosVendidos().subscribe(data => {
      this.ventas = data.data; this.cargandoVentas = false
      this.totalBoletosVendidos =  this.ventas.reduce((contador, siguiente) => contador+ siguiente.cantidad,0)
    })

    this.graficaService.obtenerVentasBoletosMes().subscribe(data => {
      this.dataGraphic = this.transformarVentasParaChart(data);
      this.cargandoGrafica = false;
    })


  }

  dataGraphic: IDataGraficsBar = {
    labels: [],
     datasets: []
  }





  cargandoBoletosExistentes = true;
  cargandoVentas = true;
  cargandoGrafica = true;
  totalBoletosVendidos = 0;

  bol: IBoletosAdmin[] = [];

  ventas: IVentaAdmin[] = []



  transformarVentasParaChart(data: IVentaResponseMes): IDataGraficsBar {
    const labels: string[] = [];
    const cantidades: number[] = [];

    // Recorremos las claves de VentaMes y sus valores
    for (const mes in data.VentaMes) {
      data.VentaMes[mes].forEach((venta) => {
        labels.push(venta.titulo); // Agregamos los títulos al eje X
        cantidades.push(Number(venta.cantidad)); // Convertimos la cantidad a número
      });
    }

    return {
      labels,
      datasets: [
        {
          label: undefined,
          data: cantidades,
          backgroundColor: "#779336",
        },
      ],
    };
  }
}
