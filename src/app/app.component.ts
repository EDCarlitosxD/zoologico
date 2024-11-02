import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalCardComponent } from './Componentes/animal-card/animal-card.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  AnimalCardComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
