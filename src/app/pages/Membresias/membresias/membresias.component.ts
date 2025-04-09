import { Component } from '@angular/core';
import { MembresiaActiveComponent } from "../../../Componentes/Membresias/membresia-active/membresia-active.component";
import { MembresiasService } from '../../../Services/membresias.service';
import { IMembresia } from '../../../types/Membresia';
import { CargandoComponent } from "../../../Componentes/cargando/cargando.component";
import { NgFor, NgIf } from '@angular/common';
import { NavBarComponent } from "../../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../../Componentes/footer/footer.component";
import { CarritoComponent } from '../../../Componentes/carrito/carrito.component';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [MembresiaActiveComponent, CargandoComponent, NgFor, NgIf, NavBarComponent, FooterComponent, CarritoComponent],
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.scss'
})
export class MembresiasComponent {

   membresias: IMembresia[] = [];
   cargando: boolean = true;
   constructor(private membresiasService: MembresiasService) {}

 
   ngOnInit() {
     this.getMembresias();
   } 
  getMembresias() {
    this.membresiasService.getActive().subscribe({
      next: (data) => {
        this.membresias = data;
        this.cargando = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
