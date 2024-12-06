import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WarningComponent } from "../../warning/warning.component";
interface Recorrido {
  img: string,
  title: string,

  valoracion: number,

  price: number,
  duracion: number,
  personaExtra: number,

  description: string,
  calendar: string
}
@Component({
  selector: 'app-recorridos-modal',
  standalone: true,
  imports: [NgClass, RouterLink, NgFor, WarningComponent],
  templateUrl: './recorridos-modal.component.html',
  styleUrl: './recorridos-modal.component.scss'
})
export class RecorridosModalComponent {
@Input () recorridos: Recorrido = {
  img: '',
  title: '',
  valoracion: 0,
  price: 0,
  duracion: 0,
  personaExtra: 0,
  description: '',
  calendar: ''
};

getStars(): number[]{
  return Array(Math.round(this.recorridos.valoracion)).fill(0);
}
}
