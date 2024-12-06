import { Component } from '@angular/core';

@Component({
  selector: 'app-verificando-mail',
  standalone: true,
  imports: [],
  templateUrl: './verificando-mail.component.html',
  styleUrl: './verificando-mail.component.scss'
})
export class VerificandoMailComponent {
  mail: string;
  constructor() {
    this.mail = 'testElSuperTilin@example.com';
  }
}
