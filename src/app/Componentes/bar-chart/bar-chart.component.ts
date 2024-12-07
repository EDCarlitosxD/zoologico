import { Component, Input } from '@angular/core';
import {Chart} from 'chart.js';

export interface IDataGraficsBar {
  datasets: {
    label: string | undefined,
    data: any[],
    backgroundColor: string | string[],
  }[]
  labels: string[],
}





@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  public chart: any;

  @Input() dataGraphics: IDataGraficsBar = {
    labels: [],
    datasets: []
  };

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dataGraphics.labels,
           datasets: this.dataGraphics.datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false, // Esto asegura que la leyenda se muestre
          },
        }
      }
    });
  }

  ngOnInit(): void {
    this.createChart();
  }

}
