import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-reco-vendidos',
  standalone: true,
  imports: [],
  templateUrl: './edit-reco-vendidos.component.html',
  styleUrl: './edit-reco-vendidos.component.scss'
})
export class EditRecoVendidosComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
