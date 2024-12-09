import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

export interface IDataGraficsBar {
  datasets: {
    label: string | undefined,
    data: any[],
    backgroundColor: string | string[],
  }[],
  labels: string[],
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  public chart: any;

  constructor(private cdr: ChangeDetectorRef) { }

  @Input() dataGraphics: IDataGraficsBar = {
    labels: [],
    datasets: []
  };

  // Método para crear el gráfico
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', // tipo de gráfico
      data: { // valores en el eje X
        labels: this.dataGraphics.labels,
        datasets: this.dataGraphics.datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false, // Ocultar la leyenda
          },
        }
      }
    });
  }

  ngOnInit(): void {
    // Registra los controladores y elementos antes de crear el gráfico
    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    // Ahora puedes crear el gráfico después de registrar los controladores
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();

    if (changes['dataGraphics'] && !changes['dataGraphics'].firstChange) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.dataGraphics.labels;
      this.chart.data.datasets = this.dataGraphics.datasets;
      this.chart.update(); // Redibuja el gráfico con los nuevos datos
    }
  }
}
