import { Component } from '@angular/core';
import { AddTarjetaComponent } from "../add-tarjeta/add-tarjeta.component";

@Component({
  selector: 'app-metodo-de-pago',
  standalone: true,
  imports: [AddTarjetaComponent],
  templateUrl: './metodo-de-pago.component.html',
  styleUrl: './metodo-de-pago.component.scss'
})
export class MetodoDePagoComponent {

}
