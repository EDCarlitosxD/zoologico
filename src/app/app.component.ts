import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

//COMPONENTES
import { AnimalCardComponent } from './Componentes/animal-card/animal-card.component';

import { NavBarComponent } from "./Componentes/nav-bar/nav-bar.component";
import { SliderComponent } from "./Componentes/slider/slider.component";

//PAGES
import { DonacionesComponent } from "./pages/donaciones/donaciones.component";
import { AnimalesComponent } from './pages/animales/animales.component';
import { HomeComponent } from './pages/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    HomeComponent,

    AnimalCardComponent,

    NavBarComponent,
    SliderComponent,


    AnimalesComponent,
    DonacionesComponent],



  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
