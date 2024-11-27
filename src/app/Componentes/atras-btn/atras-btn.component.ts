import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-atras-btn',
  standalone: true,
  imports: [],
  templateUrl: './atras-btn.component.html',
  styleUrl: './atras-btn.component.scss'
})
export class AtrasBtnComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
