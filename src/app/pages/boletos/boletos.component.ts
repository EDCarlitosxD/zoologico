import { Component } from '@angular/core';
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [AddBoletosComponent],
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent {

}
