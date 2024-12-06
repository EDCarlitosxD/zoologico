import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderDashEditComponent } from '../../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-guias',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink],
  templateUrl: './edit-guias.component.html',
  styleUrl: './edit-guias.component.scss'
})
export class EditGuiasComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
