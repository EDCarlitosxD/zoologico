import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-guias',
  standalone: true,
  imports: [],
  templateUrl: './edit-guias.component.html',
  styleUrl: './edit-guias.component.scss'
})
export class EditGuiasComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
