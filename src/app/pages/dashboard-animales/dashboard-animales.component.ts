import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { AnimalService } from '../../Services/animal.service';
import { IAnimal } from '../../types/Animales';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

interface Animales {
  id: number;
  nombre: string;
  tipo: string;
  peso: string;
  altura: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard-animales',
  standalone: true,
  imports: [DashboardContentComponent,CommonModule, RouterLink],
  templateUrl: './dashboard-animales.component.html',
  styleUrl: './dashboard-animales.component.scss'
})
export class DashboardAnimalesComponent {

  animales: IAnimal[] = [];

  constructor(private animalesServices: AnimalService){}

  ngOnInit(){
    this.animalesServices.getAll().subscribe(data => this.animales = data);
  }



  actualizarEstadoAnimal(animal:IAnimal,event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.animalesServices.updateEstado(animal.id!,inputElement.checked).subscribe(data => console.log(data));
  }


}
