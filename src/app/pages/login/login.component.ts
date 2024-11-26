import { Component } from '@angular/core';
import { LoginFormComponent } from "../../Componentes/login-form/login-form.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
