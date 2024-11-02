import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalCardComponent } from './Componentes/animal-card/animal-card.component';
import { TextButtonComponent } from "./Componentes/text-component/text-button/text-button.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalCardComponent, TextButtonComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
