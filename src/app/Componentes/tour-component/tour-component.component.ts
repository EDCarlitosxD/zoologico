import { Component, Input } from '@angular/core';
import { WarningComponent } from "../../warning/warning.component";

interface Tour {
  id: number;
  nombre: string,
  precio: number,
  img: string,
  valoracion: number,
  descripcionPrincipal: string,
  incluye: string,
  alReservar: string,
  contador: number,
  fecha: string,
  horario: number
}

@Component({
  selector: 'app-tour-component',
  standalone: true,
  imports: [WarningComponent],
  templateUrl: './tour-component.component.html',
  styleUrl: './tour-component.component.scss'
})
export class TourComponentComponent {
  @Input() tour: Tour = {
    id: 0,
    nombre: 'Expedición de Animales Nocturnos',
    precio: 150,
    img: 'img/pages/Recorridos/ExpediciónNocturna.png',
    valoracion: 5,
    descripcionPrincipal: 'Sumérgete en el misterioso mundo de los animales nocturnos. Acompañado de un guía experto te permitirá observar cómo algunas especies se preparan para la noche\.',
    incluye: '• Guía experto que te conducirá por las áreas nocturnas\.\n• Uso de linternas especiales para no alterar a los animales\.\n• Relatos sobre adaptaciones únicas al ambiente nocturno\.',
    alReservar: '• Este Tour tiene una duración aproximada de 3 horas.\n• Se realiza en grupos pequeños para garantizar una experiencia tranquila.\n• Se recomienda llevar ropa abrigadora.',
    contador: 0,
    fecha: '',
    horario: 0
  }


  minus(){
    if(this.tour.contador === 0){
      return;
    }
    let contador = this.tour.contador - 1;
    this.tour.contador = contador;
    return contador;
  }
  plus(){
    let contador = this.tour.contador + 1;
    this.tour.contador = contador;
    return contador;
  }
}
