import { Component, Input } from '@angular/core';
interface animalSolo {
  nombre: string;
  nombre_cientifico: string;
  img_principal: string;
  img_secundaria: string;
  caracteristicas_fisicas: string;
  dieta: string;
  datos_curiosos: string;
  comportamiento: string;
  peso: string;
  altura: string;
  tipo: string;
  habitat: string;
  descripcion: string;
  subtitulo: string;
  qr: string;
  img_ubicacion: string;
  estado: string;
}

@Component({
  selector: 'app-animal-solo',
  standalone: true,
  imports: [],
  templateUrl: './animal-solo.component.html',
  styleUrl: './animal-solo.component.scss'
})
export class AnimalSoloComponent {
@Input() animal: animalSolo = {
  nombre: '',
  nombre_cientifico: '',
  img_principal: '',
  img_secundaria: '',
  caracteristicas_fisicas: '',
  dieta: '',
  datos_curiosos: '',
  comportamiento: '',
  peso: '',
  altura: '',
  tipo: '',
  habitat: '',
  descripcion: '',
  subtitulo: '',
  qr: '',
  img_ubicacion: '',
  estado: ''
  };
}
