import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-animales',
  standalone: true,
  imports: [],
  templateUrl: './create-animales.component.html',
  styleUrl: './create-animales.component.scss'
})
export class CreateAnimalesComponent {
  constructor(private location: Location){}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
