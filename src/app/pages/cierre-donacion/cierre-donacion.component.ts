import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ITarjeta } from '../../types/Tarjetas';

@Component({
  selector: 'app-cierre-donacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cierre-donacion.component.html',
  styleUrl: './cierre-donacion.component.scss'
})
export class CierreDonacionComponent {

  monto = 0;
  tarjeta: ITarjeta|null = null

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { monto:number; tarjeta: ITarjeta }; // Tipar explícitamente el state

    this.monto = state?.monto;
    this.tarjeta = state?.tarjeta;

  }
}
