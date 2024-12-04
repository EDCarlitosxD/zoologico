import { Component } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { RouterLink } from '@angular/router';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { MetodoDePagoComponent } from "../../Componentes/modals/metodo-de-pago/metodo-de-pago.component";
import { WarningComponent } from "../../Componentes/warning/warning.component";

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink, AtrasBtnComponent, ContadorResumenPedidoComponent, IndicadorComponent, AddTarjetaComponent, MetodoDePagoComponent, WarningComponent],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent {

}
