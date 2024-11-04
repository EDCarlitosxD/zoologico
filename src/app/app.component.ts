import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalCardComponent } from './Componentes/animal-card/animal-card.component';
import { TextButtonComponent } from "./Componentes/text-component/text-button/text-button.component";
import { ExperienciasCardComponent } from './Componentes/experiencias-card/experiencias-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalCardComponent, TextButtonComponent, ExperienciasCardComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
