import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { IRecorrido } from '../../../types/Recorridos';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-create-animales',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink, FormsModule, CommonModule, BrowserModule],
  templateUrl: './create-animales.component.html',
  styleUrl: './create-animales.component.scss'
})
export class CreateAnimalesComponent {
  recorridoForm!: FormGroup;
  editado = false;
  recorrido: IRecorrido = {
    descripcion: '',
    descripcion_importante_reservar: '',
    descripcion_incluye: '',
    duracion: 0,
    img_recorrido: '',
    precio: 2,
    titulo: '',
  }
  constructor(private location: Location){}

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
