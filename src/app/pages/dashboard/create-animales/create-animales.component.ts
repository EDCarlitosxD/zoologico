import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-animales',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink],
  templateUrl: './create-animales.component.html',
  styleUrl: './create-animales.component.scss'
})
export class CreateAnimalesComponent {
  constructor(private location: Location){}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
