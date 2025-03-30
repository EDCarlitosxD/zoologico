import { Component } from '@angular/core';
import { DashboardContentComponent } from '../../Componentes/Admin/dashboard-content/dashboard-content.component';
import { IMembresia } from '../../types/Membresia';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MembresiasService } from '../../Services/membresias.service';
import { CargandoComponent } from "../../Componentes/cargando/cargando.component";

@Component({
  selector: 'app-dashboard-membresias',
  standalone: true,
  imports: [DashboardContentComponent, RouterLink, NgClass, NgFor, CargandoComponent, NgIf],
  templateUrl: './dashboard-membresias.component.html',
  styleUrl: './dashboard-membresias.component.scss',
})
export class DashboardMembresiasComponent {
  membresias: IMembresia[] = [];
  cargando: boolean = true;
  constructor(private membresiasService: MembresiasService) {}
  actualizarEstadoMembresia(membresia: IMembresia, event: any) {
    this.membresiasService.actualizarEstado(membresia.id!, event.target.checked).subscribe(
      (data) => console.log(data)

    );
  }

  ngOnInit() {
    this.getMembresias();
  }
  getMembresias() {
    this.membresiasService.getAll().subscribe({
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
