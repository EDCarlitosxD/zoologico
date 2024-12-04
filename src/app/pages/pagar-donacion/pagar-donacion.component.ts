import { Component } from '@angular/core';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagar-donacion',
  standalone: true,
  imports: [RouterLink, AddTarjetaComponent, AtrasBtnComponent],
  templateUrl: './pagar-donacion.component.html',
  styleUrl: './pagar-donacion.component.scss'
})
export class PagarDonacionComponent {

}
