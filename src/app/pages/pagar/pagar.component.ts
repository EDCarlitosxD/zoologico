import { Component } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { RouterLink } from '@angular/router';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink, AtrasBtnComponent, ContadorResumenPedidoComponent, IndicadorComponent, AddTarjetaComponent],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent {

}
