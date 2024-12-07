import { Component, Input, input } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';
import { Subscription } from 'rxjs';
import { IReserva } from '../../types/Reserva';

@Component({
  selector: 'app-contador-resumen-pedido',
  standalone: true,
  imports: [],
  templateUrl: './contador-resumen-pedido.component.html',
  styleUrl: './contador-resumen-pedido.component.scss'
})
export class ContadorResumenPedidoComponent {


  constructor(private carritoService: CarritoService){
  }

  @Input() tipo: "boleto" | "tour" = "boleto";

  @Input() id: number = 0;
  @Input() cantidad: number = 0;

  minus(){
    if(this.tipo === 'boleto'){
      this.carritoService.decrementarBoleto(this.id);
    }else{
      this.carritoService.decrementarPersonaTour(this.id);
    }

  }
  plus(){
    if(this.tipo == 'boleto'){
      this.carritoService.aumentarBoleto(this.id);
    }else{
      this.carritoService.aumentarPersonasTour(this.id);

    }
  }
}
