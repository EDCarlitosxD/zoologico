import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mail-verificado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mail-verificado.component.html',
  styleUrl: './mail-verificado.component.scss'
})
export class MailVerificadoComponent {
  mail: string;
  constructor() {
    this.mail = 'mailTilinSupremo@exemplo.com';
  }
}
