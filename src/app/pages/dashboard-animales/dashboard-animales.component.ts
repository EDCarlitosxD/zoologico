import { Component, Input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { AnimalService } from '../../Services/animal.service';
import { IAnimal } from '../../types/Animales';
import { CommonModule } from '@angular/common';
import {  RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [DashboardContentComponent,CommonModule,FormsModule, RouterLink, RouterLink],
  templateUrl: './dashboard-animales.component.html',
  styleUrl: './dashboard-animales.component.scss'
})
export class DashboardAnimalesComponent {

  animales: IAnimal[] = [];
  buscarAnimal = ''
  constructor(private animalesServices: AnimalService){}

  ngOnInit(){
    this.animalesServices.getAll().subscribe(data => this.animales = data);
  }


  buscar(event: Event){
    this.animalesServices.getAll(this.buscarAnimal).subscribe(data => this.animales = data);
  }

  actualizarEstadoAnimal(animal:IAnimal,event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.animalesServices.updateEstado(animal.id!,inputElement.checked).subscribe(data => console.log(data));
  }


}
