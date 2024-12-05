import { Component, ViewChild } from '@angular/core';
import { NavBarComponent } from '../../Componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { SelectorRecorridoComponent } from "../../Componentes/selector-recorrido/selector-recorrido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { TourComponentComponent } from "../../Componentes/tour-component/tour-component.component";
import { RouterLink } from '@angular/router';
import { BolDisponiblesComponent } from "../../Componentes/bol-disponibles/bol-disponibles.component";
import { WarningComponent } from "../../warning/warning.component";


import { RecorridoService } from '../../Services/recorrido.service';

import { ITour } from '../../types/Tour';
import { IBoleto } from '../../types/Boletos';
import { IRecorrido } from '../../types/Recorridos';
import { BoletosService } from '../../Services/boletos.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../Services/carrito.service';
@Component({
  selector: 'app-recorridos',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FooterComponent, CommonModule,SelectorRecorridoComponent, IndicadorComponent, AddBoletosComponent, TourComponentComponent, BolDisponiblesComponent, WarningComponent],
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.scss'
})
export class RecorridosComponent {

  constructor(private recorridoService: RecorridoService, private boletosService: BoletosService, private carritoService: CarritoService) {
    this.tours = this.carritoService.toursInfo;
   }

  boletos: IBoleto[]= []
  recorridos: IRecorrido[] = []

  tours;

  ngOnInit(){
    this.recorridoService.getRecorridosActivos().subscribe(data =>  this.recorridos = data)
    this.boletosService.getAllBoletos(1).subscribe(data =>  this.boletos = data)

  }




}
