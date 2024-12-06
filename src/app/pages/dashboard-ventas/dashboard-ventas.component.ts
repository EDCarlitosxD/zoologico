import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor } from '@angular/common';
interface Boletos {
  id: number;
  tipo: string;
  precio: number;
}
interface Ventas {
  id: number;
  tipo: string;
  precio: number;
  ventas: number;
}
@Component({
  selector: 'app-dashboard-ventas',
  standalone: true,
  imports: [DashboardContentComponent, NgFor, NgClass],
  templateUrl: './dashboard-ventas.component.html',
  styleUrl: './dashboard-ventas.component.scss'
})
export class DashboardVentasComponent {
  @Input() bol: Boletos[] = [
    {
      id: 1,
      tipo: "Niños",
      precio: 70,
    },
    {
      id: 2,
      tipo: "Adultos",
      precio: 120,
    },
    {
      id: 3,
      tipo: "Tercera Edad",
      precio: 70,
    },
  ]

  @Input() ventas: Ventas[] = [
    {
      id: 1,
      tipo: "Niños",
      precio: 70,
      ventas: 10
    },
    {
      id: 2,
      tipo: "Adultos",
      precio: 120,
      ventas: 20
    },
    {
      id: 3,
      tipo: "Tercera Edad",
      precio: 70,
      ventas: 5
    },
  ]
}
