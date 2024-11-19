import { Component } from '@angular/core';
import { BoletoComponent } from "../../Componentes/boleto/boleto.component";

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [BoletoComponent],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.scss'
})
export class ComponentesComponent {

}
