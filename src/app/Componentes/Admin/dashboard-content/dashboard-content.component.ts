import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent {
  @Input() dashboardTitulo = 'Dashboard';
  @Input() dashboardDescripcion = 'Descripcion General';

}
