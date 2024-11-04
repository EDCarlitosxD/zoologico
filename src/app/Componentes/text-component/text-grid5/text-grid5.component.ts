import { Component, Input } from '@angular/core';
interface TextGrid5 {
  title: string;
  description: string;
  boton: string;
}
@Component({
  selector: 'app-text-grid5',
  standalone: true,
  imports: [],
  templateUrl: './text-grid5.component.html',
  styleUrl: './text-grid5.component.scss'
})
export class TextGrid5Component {
  @Input() textGrid5: TextGrid5 = {
    title: '',
    description: '',
    boton: ''
  };
}

