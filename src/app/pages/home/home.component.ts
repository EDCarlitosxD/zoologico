import { Component } from '@angular/core';
import { AnimalCardComponent } from "../../Componentes/animal-card/animal-card.component";
import { BoletoComponent } from "../../Componentes/boleto/boleto.component";
import { RecorridoHomeComponent } from "../../Componentes/recorrido-home/recorrido-home.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AnimalCardComponent, BoletoComponent, RecorridoHomeComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
