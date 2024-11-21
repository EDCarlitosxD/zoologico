import { Component } from '@angular/core';
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './donaciones.component.html',
  styleUrl: './donaciones.component.scss'
})
export class DonacionesComponent {

}
