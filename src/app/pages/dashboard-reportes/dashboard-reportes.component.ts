import { Component, Input } from '@angular/core';
import { DashboardComponent } from "../Admin/dashboard/dashboard.component";
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor } from '@angular/common';
import { DashboardVentasComponent } from '../dashboard-ventas/dashboard-ventas.component';

interface Boletos{
  tipo: string;
  ventas: number;
  precio: number;
}

interface Tours{
  tour: string;
  ventas: number;
  precio: number;
}

@Component({
  selector: 'app-dashboard-reportes',
  standalone: true,
  imports: [DashboardContentComponent, NgFor, NgClass],
  templateUrl: './dashboard-reportes.component.html',
  styleUrl: './dashboard-reportes.component.scss'
})
export class DashboardReportesComponent {
  @Input() boletos: Boletos[] = [
    { tipo: 'Infantil', ventas: 50, precio: 70 },
    { tipo: 'Adultos', ventas: 120, precio: 120 },
    { tipo: 'Tercera Edad', ventas: 80, precio: 70 },
  ];

  @Input () tours: Tours[] = [
    { tour: 'Safari Fotográfico', ventas: 120, precio: 500 },
    { tour: 'Espectáculo de aves', ventas: 80, precio: 300 },
    { tour: 'Alimentación de animales', ventas: 150, precio: 200 },
    { tour: 'Recorrido nocturno', ventas: 50, precio: 600 },
    { tour: 'Exploración de selva', ventas: 70, precio: 400 },
    { tour: 'Visita guiada', ventas: 200, precio: 250 }
  ];

  getTotalBoletos(): number {
    return this.boletos.reduce((total, boleto) => total + boleto.ventas, 0);
  }

  getTotalTours(): number {
    return this.tours.reduce((total, tour) => total + tour.ventas, 0);
  }
}
