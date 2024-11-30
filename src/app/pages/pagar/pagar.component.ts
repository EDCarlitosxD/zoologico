import { Component } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink ,AtrasBtnComponent, ContadorResumenPedidoComponent, IndicadorComponent],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent {

}
