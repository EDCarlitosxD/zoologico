import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-animal',
  standalone: true,
  imports: [],
  templateUrl: './edit-animal.component.html',
  styleUrl: './edit-animal.component.scss'
})
export class EditAnimalComponent {

  constructor(private location: Location){}


  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
