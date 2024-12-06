import { Component } from '@angular/core';
import { DashboardComponent } from "../Admin/dashboard/dashboard.component";
import { DashboardContentComponent } from "../../Componentes/Admin/dashboard-content/dashboard-content.component";

@Component({
  selector: 'app-dashboard-reportes',
  standalone: true,
  imports: [DashboardComponent, DashboardContentComponent],
  templateUrl: './dashboard-reportes.component.html',
  styleUrl: './dashboard-reportes.component.scss'
})
export class DashboardReportesComponent {

}
