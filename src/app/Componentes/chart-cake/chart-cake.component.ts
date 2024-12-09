import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, DoughnutController, PieController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export interface IDataGraficsCake {
  datasets: Idatasets[]
  labels: string[],
}

export interface Idatasets {
    label: string | undefined,
    data: number[],
    backgroundColor: string | string[],
    hoverOffset: number,
}

@Component({
  selector: 'app-chart-cake',
  standalone: true,
  imports: [],
  templateUrl: './chart-cake.component.html',
  styleUrl: './chart-cake.component.scss'
})
export class ChartCakeComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  public chart: any;
  @Input() dataGraphics: IDataGraficsCake = {
    labels: [],
    datasets: []
  };

  @Input() idGraph = '';

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

  createChart(){
    Chart.register(ChartDataLabels);

    this.chart = new Chart(this.idGraph, {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dataGraphics.labels,
           datasets: this.dataGraphics.datasets,
      },
      options: {
        plugins: {
          legend: {
            display: true, // Esto asegura que la leyenda se muestre
            position: 'right',

          },
          datalabels:{
            formatter: (value: number, context: any) => {
              const data = context.dataset.data as number[];
              const total = data.reduce((sum, current) => sum + current, 0);
              const percentage = ((value / total) * 100).toFixed(2) + '%';
              return percentage; // Devuelve el porcentaje
            },
            color: '#1D1F1D', // Cambia el color del texto
            font: {
              weight: 'bold',
              size: 12
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex] as number;
                const total = dataset.data.reduce((sum: number, value: number) => sum + value, 0);
                const percentage = ((currentValue / total) * 100).toFixed(2) + '%';
                return `${tooltipItem.label}: ${currentValue} (${percentage})`;
              },
            },
          },
        },
        maintainAspectRatio: false
      },
    });
  }

  ngOnInit(){
    Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, DoughnutController, PieController );
  }

  ngAfterViewInit() {
    if (this.idGraph) {
      this.createChart();

    }
  }



}
