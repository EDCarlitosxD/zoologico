import { Component, Input, input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
interface Recorrido {
  titulo: string;
  precio: number;
  descripcion: string;
  duracion: string;
  active: boolean; // Agregado: Estado activo/inactivo
}
// interface RecorridosVendidos {

// }
interface Guia{
  nombre: string;
  disponible: boolean;
  active: boolean;
}
@Component({
  selector: 'app-dashboard-recorrido',
  standalone: true,
  imports: [DashboardContentComponent, NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './dashboard-recorrido.component.html',
  styleUrl: './dashboard-recorrido.component.scss'
})
export class DashboardRecorridoComponent {
  recs: Recorrido[] = [
    {
      titulo: 'Recorrido 1',
      precio: 100,
      descripcion: 'Este es un recorrido de ejemplo.',
      duracion: '2 horas',
      active: true
    },
    {
      titulo: 'Recorrido 2',
      precio: 150,
      descripcion: 'Otro recorrido interesante.',
      duracion: '3 horas',
      active: false
    },
    {
      titulo: 'Recorrido 3',
      precio: 200,
      descripcion: 'Un recorrido más exclusivo.',
      duracion: '4 horas',
      active: true
    },
    {
      titulo: 'Recorrido 4',
      precio: 120,
      descripcion: 'Un recorrido accesible y divertido.',
      duracion: '1.5 horas',
      active: false
    }
  ];

  guides: Guia[] = [
    {
      nombre: 'Guía 1',
      disponible: true,
      active: true
    },
    {
      nombre: 'Guía 2',
      disponible: false,
      active: true
    },    
    {
      nombre: 'Guía 3',
      disponible: true,
      active: false
    },

  ]

  // Método para alternar el estado activo/inactivo
  toggleActiveRec(row: Recorrido): void {
    row.active = !row.active; // Cambia el valor de active
    console.log(`Row "${row.titulo}" is now ${row.active ? 'active' : 'inactive'}`);
  }
  toggleActiveGuide(row: Guia): void {
    row.active = !row.active; // Cambia el estado activo/inactivo
    console.log(`Guide "${row.nombre}" is now ${row.active ? 'active' : 'inactive'}`);
  }
}
