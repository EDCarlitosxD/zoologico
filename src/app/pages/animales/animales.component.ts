import { Component } from '@angular/core';
import { AnimalCardComponent } from "../../Componentes/animal-card/animal-card.component";
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { AnimalService } from '../../Services/animal.service';
import { IAnimalCard } from '../../types/Animales';
import { CommonModule } from '@angular/common';
import { IPagination } from '../../types/Pagination';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [AnimalCardComponent, NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.scss'
})
export class AnimalesComponent {

  constructor(private animalService: AnimalService){}

  private page = 1;
  public pagination: IPagination<IAnimalCard> | null = null;

  ngOnInit(){
    this.animalService.getAnimalCard().subscribe(data => this.pagination = data);
  }



}
