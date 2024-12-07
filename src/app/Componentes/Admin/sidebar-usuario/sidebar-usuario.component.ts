import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-usuario.component.html',
  styleUrl: './sidebar-usuario.component.scss'
})
export class SidebarUsuarioComponent {

}
