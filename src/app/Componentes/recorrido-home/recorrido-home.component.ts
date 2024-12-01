import { Component, Input } from '@angular/core';
import { RecorridosModalComponent } from "../modals/recorridos-modal/recorridos-modal.component";

@Component({
  selector: 'app-recorrido-home',
  standalone: true,
  imports: [RecorridosModalComponent],
  templateUrl: './recorrido-home.component.html',
  styleUrl: './recorrido-home.component.scss'
})
export class RecorridoHomeComponent {
  @Input() titulo = "";
  @Input() valoracion = "";
  @Input() img = "";
}
