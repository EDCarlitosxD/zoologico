import { Component, Input } from '@angular/core';
import { PerfilContentComponent } from "../../Componentes/Admin/perfil-content/perfil-content.component";
import { NgClass, NgFor } from '@angular/common';

interface Compra {
  fecha: string;
}

interface Boletos {
  boleto: string;
  fecha: string;
  cantidad: number;
  precio: number;
}

interface Tours {
  tour: string;
  fecha: string;
  personas: number;
  precio: number;
}

@Component({
  selector: 'app-compras-realizadas',
  standalone: true,
  imports: [PerfilContentComponent, NgFor, NgClass],
  templateUrl: './compras-realizadas.component.html',
  styleUrls: ['./compras-realizadas.component.scss']
})
export class ComprasRealizadasComponent {
  @Input() compras: Compra[] = [
    { fecha: '2022-01-01' },
    { fecha: '2022-01-15' },
  ];

  boletosFiltrados(compraFecha: string): Boletos[] {
    return this.boletos.filter(boleto => boleto.fecha === compraFecha);
  }

  ToursFiltrados(compraFecha: string): Tours[] {
    return this.tours.filter(tour => tour.fecha === compraFecha);
  }

  subtotalPorCompra(fechaCompra: string): number {
    return this.boletos
      .filter(boleto => boleto.fecha === fechaCompra)
      .reduce((total, boleto) => total + boleto.precio * boleto.cantidad, 0);
  }

  subtotalPorTour(fechaCompra: string): number {
    return this.tours
      .filter(tour => tour.fecha === fechaCompra)
      .reduce((total, tour) => total + tour.precio * tour.personas, 0);
  }
  

  

  @Input() boletos: Boletos[] = [
    {
      boleto: 'Boleto 1',
      fecha: this.compras[0].fecha,
      cantidad: 3,
      precio: 20,
    },
    {
      boleto: 'Boleto 1',
      fecha: this.compras[0].fecha,
      cantidad: 3,
      precio: 20,
    },
    {
      boleto: 'Boleto 1',
      fecha: this.compras[0].fecha,
      cantidad: 2,
      precio: 20,
    },
    {
      boleto: 'Boleto 2',
      fecha: this.compras[1].fecha,
      cantidad: 2,
      precio: 25,
    },
  ];

  @Input() tours: Tours[] = [
    {
      tour: 'Tour 1',
      fecha: this.compras[0].fecha,
      personas: 4,
      precio: 50,
    },
    {
      tour: 'Tour 2',
      fecha: this.compras[1].fecha,
      personas: 2,
      precio: 60,
    },
    {
      tour: 'Tour 2',
      fecha: this.compras[1].fecha,
      personas: 2,
      precio: 60,
    },
    {
      tour: 'Tour 2',
      fecha: this.compras[1].fecha,
      personas: 2,
      precio: 60,
    },
    {
      tour: 'Tour 2',
      fecha: this.compras[1].fecha,
      personas: 2,
      precio: 60,
    },
    {
      tour: 'Tour 2',
      fecha: this.compras[1].fecha,
      personas: 2,
      precio: 60,
    },
  ];
}
