import { Component, Input } from '@angular/core';
import { SidebarUsuarioComponent } from "../sidebar-usuario/sidebar-usuario.component";

@Component({
  selector: 'app-perfil-content',
  standalone: true,
  imports: [SidebarUsuarioComponent],
  templateUrl: './perfil-content.component.html',
  styleUrl: './perfil-content.component.scss'
})
export class PerfilContentComponent {
  @Input() titulo = 'Dashboard';
  @Input() descripcion = 'Descripcion General';
}
