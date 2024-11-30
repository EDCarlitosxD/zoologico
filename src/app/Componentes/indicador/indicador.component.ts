import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

interface step {
  ticket: string;
  confirmacion: string;
  finalizar: string;
}

@Component({
  selector: 'app-indicador',
  standalone: true,
  imports: [NgClass],
  templateUrl: './indicador.component.html',
  styleUrl: './indicador.component.scss'
})
export class IndicadorComponent {
  @Input() step: step = {
    ticket: '',
    confirmacion: '',
    finalizar: ''
  }


}
