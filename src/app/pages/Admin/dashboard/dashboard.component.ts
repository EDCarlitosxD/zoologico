import { Component } from '@angular/core';
import { SidebarComponent } from '../../../Componentes/Admin/sidebar/sidebar.component';
import { DashboardContentComponent } from "../../../Componentes/Admin/dashboard-content/dashboard-content.component";
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
import 'chartjs-chart-financial';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardContentComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  public chart: any;


}
