import { Component } from '@angular/core';
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
@Component({
  selector: 'app-recorridos',
  standalone: true,
  imports: [NgFor, RouterLink, NavBarComponent, FooterComponent, SelectorRecorridoComponent, IndicadorComponent, AddBoletosComponent, TourComponentComponent, BolDisponiblesComponent, WarningComponent],
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.scss'
})
export class RecorridosComponent {
  bols: Boletos[] = [
    { type: 'Infantil', price: 70, cantidad: 0 },
    { type: 'Adultos', price: 120, cantidad: 1 },
    { type: 'Tercera Edad', price: 70, cantidad: 0 },
  ]
}
