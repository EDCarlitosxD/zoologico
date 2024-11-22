import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recorrido-home',
  standalone: true,
  imports: [],
  templateUrl: './recorrido-home.component.html',
  styleUrl: './recorrido-home.component.scss'
})
export class RecorridoHomeComponent {
  @Input() titulo = "";
  @Input() valoracion = "";
  @Input() img = "";
}
