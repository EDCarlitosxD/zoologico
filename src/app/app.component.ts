import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

//COMPONENTES
import { AnimalCardComponent } from './Componentes/animal-card/animal-card.component';
import { ExperienciasCardComponent } from './Componentes/experiencias-card/experiencias-card.component';
import { TextGrid4Component } from './Componentes/text-component/text-grid4/text-grid4.component';
import { TextGrid5Component } from './Componentes/text-component/text-grid5/text-grid5.component';
import { BoletosComponent } from './Componentes/boletos/boletos.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { NavBarComponent } from "./Componentes/nav-bar/nav-bar.component";

//PAGES


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavBarComponent,
    FooterComponent,
    ],



  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
