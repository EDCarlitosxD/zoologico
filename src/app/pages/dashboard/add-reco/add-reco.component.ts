import { Location, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
interface Horario{
  fecha: string;
  hora: string;
  guia: string;
  active: boolean;
}
@Component({
  selector: 'app-add-reco',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './add-reco.component.html',
  styleUrl: './add-reco.component.scss'
})
export class AddRecoComponent {
  @Input() horarios: Horario[] = [
    { fecha: "15 septiembre", hora: "13:30", guia: "Adrian Hernandez", active: true },
    { fecha: "16 septiembre", hora: "10:00", guia: "Maria Lopez", active: false },
    { fecha: "17 septiembre", hora: "12:45", guia: "Carlos Perez", active: true },
    { fecha: "18 septiembre", hora: "15:30", guia: "Laura Martinez", active: true },
    { fecha: "19 septiembre", hora: "09:00", guia: "Jose Garcia", active: false },
    { fecha: "20 septiembre", hora: "17:00", guia: "Ana Rivera", active: true },
    { fecha: "21 septiembre", hora: "11:15", guia: "Luis Sanchez", active: false }
  ];

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }

  toggleActive(horario: Horario){
    horario.active = !horario.active;
    console.log(`${horario. fecha} is now ${horario.active ? 'active': 'inactive'}`);
    
  }
}
