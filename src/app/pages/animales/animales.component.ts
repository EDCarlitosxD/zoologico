import { Component } from '@angular/core';
import { AnimalCardComponent } from "../../Componentes/animal-card/animal-card.component";

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [AnimalCardComponent],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.scss'
})
export class AnimalesComponent {

}
