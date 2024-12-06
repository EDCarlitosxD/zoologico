import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [SidebarComponent, NgClass, RouterLink],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent {
  @Input() dashboardTitulo = 'Dashboard';
  @Input() dashboardDescripcion = 'Descripcion General';
  @Input() dashButton = 'Agregar animal';
  @Input() classButton = 'none';
  @Input() routerButton = '';




}
