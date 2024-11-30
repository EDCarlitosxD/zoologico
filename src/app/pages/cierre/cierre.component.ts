import { Component } from '@angular/core';
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cierre',
  standalone: true,
  imports: [RouterLink, IndicadorComponent],
  templateUrl: './cierre.component.html',
  styleUrl: './cierre.component.scss'
})
export class CierreComponent {

}
