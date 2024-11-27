import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-recorridos',
  standalone: true,
  imports: [],
  templateUrl: './edit-recorridos.component.html',
  styleUrl: './edit-recorridos.component.scss'
})
export class EditRecorridosComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
