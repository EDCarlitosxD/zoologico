import { Component, Input } from '@angular/core';
import { SidebarUsuarioComponent } from "../../Componentes/Admin/sidebar-usuario/sidebar-usuario.component";
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { PerfilContentComponent } from "../../Componentes/Admin/perfil-content/perfil-content.component";
import { NgFor } from '@angular/common';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
interface Perfil {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}
interface Tarjetas{
  tarjeta: number;
}
@Component({
  selector: 'app-datos-perfil',
  standalone: true,
  imports: [NgFor, SidebarUsuarioComponent, DashboardContentComponent, PerfilContentComponent, AddTarjetaComponent],
  templateUrl: './datos-perfil.component.html',
  styleUrl: './datos-perfil.component.scss'
})
export class DatosPerfilComponent {
  @Input() perfil: Perfil = {
    nombre: 'Adrian',
    apellido: 'Hernandez',
    email: 'ahb@bunubnj.com',
    password: 'snwnisw'
  }
  @Input() tarjetas: Tarjetas[] = [
    {tarjeta: 1},
    {tarjeta: 2},
    {tarjeta: 3},
    {tarjeta: 4},
    {tarjeta: 7851},
    {tarjeta: 1569},
    
  ]
}
