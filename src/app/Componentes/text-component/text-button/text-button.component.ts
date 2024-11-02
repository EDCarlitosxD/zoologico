// animal-card.component.ts
import { Component, Input } from '@angular/core';

interface TextButton {
  title: string;
  texto: string;
  boton: string;
}

@Component ({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],

  standalone: true
})
export class TextButtonComponent {
  @Input() textButton: TextButton = {
    title: '',
    texto: '',
    boton: ''
  };
}