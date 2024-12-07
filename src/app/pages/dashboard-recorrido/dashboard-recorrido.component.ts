import { Component, Input, input } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecorridoService } from '../../Services/recorrido.service';
import { IReservaDashboard } from '../../types/Reserva';
import { CargandoComponent } from "../../Componentes/cargando/cargando.component";
import { GuiaService } from '../../Services/guia.service';
import { IGuia } from '../../types/Guias';


export interface IRecorridoAdmin {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  duracion: string;
  estado: boolean; // Agregado: Estado activo/inactivo
}
// interface RecorridosVendidos {

// }

@Component({
  selector: 'app-dashboard-recorrido',
  standalone: true,
  imports: [DashboardContentComponent, NgClass, NgFor, NgIf, RouterLink, CargandoComponent],
  templateUrl: './dashboard-recorrido.component.html',
  styleUrl: './dashboard-recorrido.component.scss'
})
export class DashboardRecorridoComponent {

  constructor(private recorridoService:RecorridoService, private guiasService: GuiaService){}

  ngOnInit(){
      this.recorridoService.getRecorridos().subscribe(data => {
        this.recs = data;
        this.cargandoTours = false;
        console.log(data);

      })

      this.recorridoService.getReservasDashboard().subscribe(data => {
        this.reservas = data.data;
        this.cargandoReservas = false;

      })


      this.guiasService.getAll().subscribe(data => {
        this.guides = data;
        this.cargandoGuias = false;
      })

    }




  cargandoTours = true;
    cargandoReservas = true;
  cargandoGuias = true;
  recs: IRecorridoAdmin[] = []
  reservas: IReservaDashboard[] = []



  guides: IGuia[] = []

  // Método para alternar el estado activo/inactivo
  toggleActiveRec(row: IRecorridoAdmin): void {
    row.estado = !row.estado; // Cambia el valor de estado
    this.recorridoService.actualizarEstadoRecorrido(row.estado,row.id).subscribe(data => console.log(data));

  }
  toggleActiveGuide(row: IGuia): void {
    row.estado = !row.estado; // Cambia el estado estado/inactivo
    this.guiasService.actualizarEstado(row.estado, row.id!).subscribe(data => console.log(data))
  }
}

