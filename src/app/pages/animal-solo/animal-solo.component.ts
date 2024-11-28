import { Component, Input } from '@angular/core';
import { IAnimal } from '../../types/Animales';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../Services/animal.service';
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";


@Component({
  selector: 'app-animal-solo',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './animal-solo.component.html',
  styleUrl: './animal-solo.component.scss'
})
export class AnimalSoloComponent {

  constructor(private activateRoute: ActivatedRoute, private animalService: AnimalService){}

  ngOnInit() {
    const routeParams = this.activateRoute.snapshot.paramMap;
    const slug = routeParams.get('slug')!;

    this.animalService.getAnimal(slug).subscribe(data => this.animal = data);
  }


  animal: IAnimal = {
  id: null,
  nombre: '',
  nombre_cientifico: '',
  imagen_principal: '',
  imagen_secundaria: '',
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
  estado: true
  };
}
