// animal-card.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Animal {
  nombre: string;
  peso: string;
  altura: string;
  tipo: string;
  nombreCientifico: string;
  imagenUrl: string;
}

@Component ({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  imports: [RouterLink],
  standalone: true
})
export class AnimalCardComponent {
  @Input() animal: Animal = {
    nombre: '',
    peso: '',
    altura: '',
    tipo: '',
    nombreCientifico: '',
    imagenUrl: '',
  };
}

