import { Component, Input } from '@angular/core';
import { RecorridosModalComponent } from "../modals/recorridos-modal/recorridos-modal.component";

interface A {
  id: number;
  titulo: string;
  valoracion: string;
  img: string;
}
@Component({
  selector: 'app-recorrido-home',
  standalone: true,
  imports: [RecorridosModalComponent],
  templateUrl: './recorrido-home.component.html',
  styleUrl: './recorrido-home.component.scss'
})
export class RecorridoHomeComponent {
  @Input() a: A = {
   id: 0,
   titulo: "",
   valoracion: "",
   img: "",
  }
}
