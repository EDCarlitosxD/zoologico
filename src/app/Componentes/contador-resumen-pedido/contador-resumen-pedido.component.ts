import { Component } from '@angular/core';

@Component({
  selector: 'app-contador-resumen-pedido',
  standalone: true,
  imports: [],
  templateUrl: './contador-resumen-pedido.component.html',
  styleUrl: './contador-resumen-pedido.component.scss'
})
export class ContadorResumenPedidoComponent {

  cantidad: number = 0;
  
  minus(){
    if(this.cantidad === 0){
      return;
    }
    let contador = this.cantidad - 1;
    this.cantidad = contador;
    return contador;
  }
  plus(){
    let contador = this.cantidad + 1;
    this.cantidad = contador;
    return contador;
  }
}
