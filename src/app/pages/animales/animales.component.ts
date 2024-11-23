import { Component } from '@angular/core';
import { AnimalCardComponent } from "../../Componentes/animal-card/animal-card.component";
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [AnimalCardComponent, NavBarComponent, FooterComponent],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.scss'
})
export class AnimalesComponent {

}
