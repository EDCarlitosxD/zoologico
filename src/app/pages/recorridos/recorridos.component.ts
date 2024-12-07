import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarComponent } from '../../Componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { SelectorRecorridoComponent } from "../../Componentes/selector-recorrido/selector-recorrido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { TourComponentComponent } from "../../Componentes/tour-component/tour-component.component";
import { RouterLink } from '@angular/router';
import { BolDisponiblesComponent } from "../../Componentes/bol-disponibles/bol-disponibles.component";
import { WarningComponent } from "../../Componentes/warning/warning.component";
import { NgFor } from '@angular/common';
interface Boletos {
  type: string;
  price: number;
  cantidad: number;
}


import { RecorridoService } from '../../Services/recorrido.service';

import { ITour } from '../../types/Tour';
import { IBoleto, IBoletoVenta } from '../../types/Boletos';
import { IRecorrido } from '../../types/Recorridos';
import { BoletosService } from '../../Services/boletos.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../Services/carrito.service';
import { Subscription } from 'rxjs';
import { IReserva, IReservaInformacion } from '../../types/Reserva';
@Component({
  selector: 'app-recorridos',
  standalone: true,
  imports: [NgFor, RouterLink, NavBarComponent, FooterComponent, CommonModule, IndicadorComponent, AddBoletosComponent, TourComponentComponent, BolDisponiblesComponent, WarningComponent],
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.scss'
})
export class RecorridosComponent implements OnInit{

  constructor(private recorridoService: RecorridoService, private boletosService: BoletosService, private carritoService: CarritoService) {
    this.tours = this.carritoService.toursInfo;
    this.boletos = this.carritoService.boletosInformacion;
    this.boletosVenta = this.carritoService.boletosVenta;

    console.log(this.boletos);

   }

   private subscriptioTour?: Subscription;
   private subscriptioBoletos?: Subscription;
   private subscriptionBoletosVenta?: Subscription;

  boletos: IBoleto[]= []
  recorridos: IRecorrido[] = []
  boletosVenta: IBoletoVenta[] = []
  reservas: IReserva[] = []
  tours;
  toursInfo: IReservaInformacion[] = [];

  totalRecorridos = 0;
  totalBoletos = 0;


  ngOnInit(){
    this.recorridoService.getRecorridosActivos().subscribe(data =>  this.recorridos = data)
    this.subscriptioTour = this.carritoService.toursInfo$.subscribe(data => {
      this.toursInfo = data
      this.totalRecorridos = this.toursInfo.reduce((acumulador, siguiente) => acumulador+ (siguiente.tour.precio * siguiente.reserva.cantidad!),0)
      console.log(this.totalRecorridos);

    });
    this.subscriptioTour = this.carritoService.tours$.subscribe(data => {
      this.reservas = data

    }
    );
    this.subscriptioBoletos = this.carritoService.boletoInformacion$.subscribe(data => this.boletos = data);
    this.subscriptionBoletosVenta = this.carritoService.boletoVenta$.subscribe(data => {
      this.boletosVenta = data;
      this.totalBoletos = this.boletos.reduce((acumulador, siguiente,index) => acumulador + (siguiente.precio * this.boletosVenta[index].cantidad) ,0);
    });

  }

  plusBoleto(id: number){
    this.carritoService.aumentarBoleto(id);
  }

  minusBoleto(id: number){
    this.carritoService.decrementarBoleto(id);
  }

  ngOnDestroy() {
    // Limpiamos la suscripción para evitar fugas de memoria
    if (this.subscriptioTour) {
      this.subscriptioTour.unsubscribe();
    }

    if (this.subscriptioBoletos) {
      this.subscriptioBoletos.unsubscribe();
    }

    if (this.subscriptionBoletosVenta) {
      this.subscriptionBoletosVenta.unsubscribe();
    }

  }


  eliminarCarrito($idHorarrio: number){
    this.carritoService.eliminarCarritoReserva($idHorarrio);
    alert("holamundo")
  }



}
