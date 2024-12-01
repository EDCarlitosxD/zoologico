import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Experiencias{
  img: string,
  title: string,
  description1: string,
  description2: string,
  lun: boolean;
  mar: boolean;
  mie: boolean;
  jue: boolean;
  vie: boolean;
  sab: boolean;
  dom: boolean;

}
@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [NgClass],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.scss'
})
export class ExperienciasComponent {
@Input () experiencias: Experiencias = {
  img: '',
  title: '',
  description1: '',
  description2: '',
  lun: false,
  mar: false,
  mie: false,
  jue: false,
  vie: false,
  sab: false,
  dom: false
}
}
