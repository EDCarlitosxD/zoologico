import { Component } from '@angular/core';
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";

@Component({
  selector: 'app-dashboard-ventas',
  standalone: true,
  imports: [DashboardContentComponent],
  templateUrl: './dashboard-ventas.component.html',
  styleUrl: './dashboard-ventas.component.scss'
})
export class DashboardVentasComponent {

}
