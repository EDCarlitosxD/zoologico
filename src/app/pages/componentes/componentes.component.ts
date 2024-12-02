import { Component } from '@angular/core';
import { BoletoComponent } from "../../Componentes/boleto/boleto.component";
import { RecorridoHomeComponent } from "../../Componentes/recorrido-home/recorrido-home.component";
import { MetodoDePagoComponent } from "../../Componentes/modals/metodo-de-pago/metodo-de-pago.component";



@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [BoletoComponent, RecorridoHomeComponent, MetodoDePagoComponent],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.scss'
})
export class ComponentesComponent {

}
