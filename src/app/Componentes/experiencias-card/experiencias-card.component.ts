import { Component, Input } from '@angular/core';
interface Experiencias{
  title: string;
  texto: string;
  image: string;
}
@Component({
  selector: 'app-experiencias-card',
  templateUrl: './experiencias-card.component.html',
  styleUrl: './experiencias-card.component.scss',
  standalone: true
})
export class ExperienciasCardComponent {
  @Input() experiencias: Experiencias = {
    title: '',
    texto: '',
    image: ''
  };
}
