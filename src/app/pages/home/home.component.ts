import { Component } from '@angular/core';
import { AnimalCardComponent } from "../../Componentes/animal-card/animal-card.component";
import { BoletoComponent } from "../../Componentes/boleto/boleto.component";
import { RecorridoHomeComponent } from "../../Componentes/recorrido-home/recorrido-home.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { SliderComponent } from "../../Componentes/slider/slider.component";
import { RouterLink } from '@angular/router';
import { AnimalEnum } from '../../types/Animales';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AnimalCardComponent, BoletoComponent, RecorridoHomeComponent, FooterComponent, NavBarComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  AnimalEnum = AnimalEnum
}
