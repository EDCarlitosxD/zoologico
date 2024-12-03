import { Component } from '@angular/core';
import { NavBarComponent } from '../../Componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { SelectorRecorridoComponent } from "../../Componentes/selector-recorrido/selector-recorrido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { TourComponentComponent } from "../../Componentes/tour-component/tour-component.component";
import { RouterLink } from '@angular/router';
import { BolDisponiblesComponent } from "../../Componentes/bol-disponibles/bol-disponibles.component";
import { WarningComponent } from "../../warning/warning.component";

@Component({
  selector: 'app-recorridos',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FooterComponent, SelectorRecorridoComponent, IndicadorComponent, AddBoletosComponent, TourComponentComponent, BolDisponiblesComponent, WarningComponent],
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.scss'
})
export class RecorridosComponent {

}
