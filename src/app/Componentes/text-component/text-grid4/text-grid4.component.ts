// animal-card.component.ts
import { Component, Input } from '@angular/core';

interface TextGrid4 {
  title: string;
  description: string;
  boton: string;
}

@Component ({
  selector: 'app-text-grid4',
  templateUrl: './text-grid4.component.html',
  styleUrls: ['./text-grid4.component.scss'],

  standalone: true
})
export class TextGrid4Component {
  @Input() textGrid4: TextGrid4 = {
    title: '',
    description: '',
    boton: ''
  };
}