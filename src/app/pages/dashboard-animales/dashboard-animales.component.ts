import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor } from '@angular/common';

interface Animales {
  id: number;
  nombre: string;
  tipo: string;
  peso: string;
  altura: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard-animales',
  standalone: true,
  imports: [DashboardContentComponent, NgFor, NgClass],
  templateUrl: './dashboard-animales.component.html',
  styleUrl: './dashboard-animales.component.scss'
})
export class DashboardAnimalesComponent {
  @Input() animales: Animales[] = [
    { id: 1, nombre: "Águila Real", tipo: "Aéreo", peso: "6 kg", altura: "75 cm", active: true },
    { id: 2, nombre: "León Africano", tipo: "Terrestre", peso: "190 kg", altura: "1.2 m", active: false },
    { id: 3, nombre: "Cóndor Andino", tipo: "Aéreo", peso: "15 kg", altura: "1.3 m", active: true },
    { id: 4, nombre: "Elefante Asiático", tipo: "Terrestre", peso: "5000 kg", altura: "3 m", active: false },
    { id: 5, nombre: "Halcón Peregrino", tipo: "Aéreo", peso: "1.5 kg", altura: "50 cm", active: true },
    { id: 6, nombre: "Canguro Rojo", tipo: "Terrestre", peso: "85 kg", altura: "1.8 m", active: true },
    { id: 7, nombre: "Colibrí Esmeralda", tipo: "Aéreo", peso: "3 g", altura: "10 cm", active: false },
    { id: 8, nombre: "Jirafa", tipo: "Terrestre", peso: "800 kg", altura: "5.5 m", active: true },
    { id: 9, nombre: "Pingüino Emperador", tipo: "Terrestre", peso: "40 kg", altura: "1.2 m", active: false },
    { id: 10, nombre: "Cisne Blanco", tipo: "Aéreo", peso: "12 kg", altura: "1.5 m", active: true },
    { id: 11, nombre: "Tigre de Bengala", tipo: "Terrestre", peso: "220 kg", altura: "1.1 m", active: true },
    { id: 12, nombre: "Flamenco Rosado", tipo: "Aéreo", peso: "4 kg", altura: "1.2 m", active: false },
    { id: 13, nombre: "Oso Polar", tipo: "Terrestre", peso: "450 kg", altura: "1.6 m", active: true },
    { id: 14, nombre: "Búho Real", tipo: "Aéreo", peso: "2.5 kg", altura: "65 cm", active: true },
    { id: 15, nombre: "Rinoceronte Blanco", tipo: "Terrestre", peso: "2400 kg", altura: "1.8 m", active: false }
  ];

  toggleActiveAn(row: Animales) {
    row.active = !row.active;
    console.log(`${row.nombre} is now ${row.active ? 'active': 'inactive'}` );
  }
  
  
}
