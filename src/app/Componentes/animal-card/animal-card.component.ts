// animal-card.component.ts
import { Component, Input } from '@angular/core';
import { AnimalEnum, IAnimalCard } from '../../types/Animales';
import { RouterLink } from '@angular/router';
import { CapitalizePipe } from '../../Pipes/capitalize.pipe';


@Component ({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  imports: [RouterLink, CapitalizePipe],
  styleUrls: ['./animal-card.component.scss'],
  standalone: true
})

export class AnimalCardComponent {
  @Input() animal: IAnimalCard = {
    nombre: '',
    peso: '',
    altura: '',
    tipo: AnimalEnum.Terrestre,
    nombre_cientifico: '',
    imagen_principal: '',
    slug: '',
  };
}

