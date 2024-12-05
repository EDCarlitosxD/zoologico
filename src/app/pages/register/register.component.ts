import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VerificandoMailComponent } from "../../Componentes/modals/verificando-mail/verificando-mail.component";
import { MailVerificadoComponent } from "../../Componentes/modals/mail-verificado/mail-verificado.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, VerificandoMailComponent, MailVerificadoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
