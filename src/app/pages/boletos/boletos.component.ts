import { Component } from '@angular/core';
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [AddBoletosComponent, NavBarComponent, FooterComponent],
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent {

}
