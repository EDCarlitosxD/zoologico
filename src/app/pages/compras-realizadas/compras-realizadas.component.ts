import { Component, Input } from '@angular/core';
import { PerfilContentComponent } from "../../Componentes/Admin/perfil-content/perfil-content.component";
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { VentaService } from '../../Service/venta.service';

interface Boleto {
  titulo: string;
  fecha: string; // "YYYY-MM-DD"
  cantidad: number;
  precio_total: string; // Se puede usar 'number' si se planea trabajar con cálculos
  token: string;
}

interface Reserva {
  titulo: string;
  fecha: string; // "YYYY-MM-DD"
  cantidad: number;
  precio_total: string | null; // Puede ser null si no se asigna un precio
  token: string;
}

export interface IComprasRealizadas {
  boletos: Record<string, Boleto[]>;
  reservas: Record<string, Reserva[]>;
}

@Component({
  selector: 'app-compras-realizadas',
  standalone: true,
  imports: [PerfilContentComponent, NgFor, NgClass, CommonModule],
  templateUrl: './compras-realizadas.component.html',
  styleUrls: ['./compras-realizadas.component.scss']
})
export class ComprasRealizadasComponent {

  constructor(private ventaService: VentaService){}
  // @Input() compras: Compra[] = [
  //   { fecha: '2022-01-01' },
  //   { fecha: '2022-01-15' },
  // ];


  tokens: string[] = []
  compras: IComprasRealizadas = {
    boletos: {},
    reservas: {},
  }
  ngOnInit(){
    this.ventaService.getComprasUsuario().subscribe(data => {
      this.compras = data
      this.tokens = [
        ...new Set([
            ...Object.keys(data.boletos),
            ...Object.keys(data.reservas)
        ])
    ];


    console.log(this.tokens);

    })
  }

calculateTotalBoletos(token: string): number {
  const boletos = this.compras.boletos[token];
  if (!boletos || boletos.length === 0) {
    return 0; // Retorna 0 si no hay boletos
  }
  return boletos.reduce((total: number, boleto: Boleto) => total + parseInt(boleto.precio_total), 0);

}

calculateTotalReservas(token: string): number {
  const reservas = this.compras.reservas[token];
  if (!reservas || reservas.length === 0) {
    return 0; // Retorna 0 si no hay boletos
  }
  return reservas.reduce((total: number, reserva: Reserva) => total + parseInt(reserva.precio_total!), 0);

}



}
