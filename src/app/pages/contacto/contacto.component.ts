import { Component } from '@angular/core';
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from '../../Componentes/footer/footer.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

}
