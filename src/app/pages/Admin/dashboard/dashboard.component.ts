import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../../../Componentes/Admin/sidebar/sidebar.component';
import { DashboardContentComponent } from "../../../Componentes/Admin/dashboard-content/dashboard-content.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChartCakeComponent, IDataGraficsCake, Idatasets } from '../../../Componentes/chart-cake/chart-cake.component';
import { CargandoComponent } from '../../../Componentes/cargando/cargando.component';
import { BarChartComponent, IDataGraficsBar } from '../../../Componentes/bar-chart/bar-chart.component';
import { GraficaService } from '../../../Service/grafica.service';
import { IDonacionResponse, IVentaItem, IVentaResponseAño, IVentaResponseMes, IVentaResponseSemana } from '../../dashboard-ventas/dashboard-ventas.component';
import { TourComponentComponent } from '../../../Componentes/tour-component/tour-component.component';
import { RouterOutlet } from '@angular/router';
interface Boletos {
  tipo: string;
  ventas: number;
  precio: number;
}

interface Tours {
  tour: string;
  ventas: number;
  precio: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardContentComponent, RouterOutlet, NgFor, NgIf, NgClass, ChartCakeComponent, CargandoComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor(private graficaService: GraficaService) { }



  @Input() tours: Tours[] = [
    { tour: 'Safari Fotográfico', ventas: 120, precio: 500 },
    { tour: 'Espectáculo de aves', ventas: 80, precio: 300 },
    { tour: 'Alimentación de animales', ventas: 150, precio: 200 },
    { tour: 'Recorrido nocturno', ventas: 50, precio: 600 },
    { tour: 'Exploración de selva', ventas: 70, precio: 400 },
    { tour: 'Visita guiada', ventas: 200, precio: 250 }
  ];

  boletoData: IVentaResponseMes | IVentaResponseSemana | IVentaResponseAño | null = null;
  boletos: IVentaItem[] = [];
  cargandoGraphicaBoletos = true;
  cargandoGraphicaRecorridos = true;
  boletosGraphicData: IDataGraficsCake = {
    datasets: [],
    labels: []
  };

  recorridoData: IVentaResponseMes | IVentaResponseSemana | IVentaResponseAño | null = null;
  recorridos: IVentaItem[] = [];
  recorridosGraphicData: IDataGraficsCake = {
    datasets: [],
    labels: []
  };

  cargandoDonacion = true;
  donacionesData: IDonacionResponse| null = null;
  donacionesGraphicData: IDataGraficsBar = {
    datasets: [],
    labels: [],
  }




  ngOnInit() {
    this.graficaService.obtenerVentasBoletosMes().subscribe(data => {
      this.boletoData = data;
      this.boletos = this.extraerDataBoletosMes();
      this.boletosGraphicData = this.createCakeDataBoletosMes();
      this.cargandoGraphicaBoletos = false;
    });

    this.cargandoGraphicaRecorridos = true;
    this.graficaService.obtenerVentasRecorridosMes().subscribe(data => {
      this.recorridoData = data;
      this.recorridos = this.extraerDataRecorridosMes();
      this.recorridosGraphicData = this.createCakeDataRecorridoMes();
      this.cargandoGraphicaRecorridos = false;
    })


    this.graficaService.obtenerDonacionesMes().subscribe(data =>{
      this.donacionesData = data;
      console.log(data);

      this.donacionesGraphicData = this.transformarVentasParaChart(data);
      console.log(this.donacionesGraphicData);
      this.cargandoDonacion = false;


    })

  }

  extraerDataBoletosMes() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.boletoData as IVentaResponseMes).VentaMes) {
      const keys = Object.keys((this.boletoData as IVentaResponseMes).VentaMes);

      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseMes).VentaMes[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }


    return data;
  }

  extraerDataBoletosSemana() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.boletoData as IVentaResponseSemana).VentaSemana) {
      const keys = Object.keys((this.boletoData as IVentaResponseSemana).VentaSemana);

      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseSemana).VentaSemana[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }
    return data;
  }

  extraerDataBoletosAño() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.boletoData as IVentaResponseAño).VentaYear) {
      const keys = Object.keys((this.boletoData as IVentaResponseAño).VentaYear);

      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseAño).VentaYear[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }
    return data;
  }


  createCakeDataBoletosMes(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.boletoData as IVentaResponseMes).VentaMes) {
      const keys = Object.keys((this.boletoData as IVentaResponseMes).VentaMes);

      // Procesar los elementos de VentaMes
      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseMes).VentaMes[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);

    const dataSets: Idatasets[] = [{
      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }

  createCakeDataBoletosSemana(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.boletoData as IVentaResponseSemana).VentaSemana) {
      const keys = Object.keys((this.boletoData as IVentaResponseSemana).VentaSemana);

      // Procesar los elementos de VentaSemana
      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseSemana).VentaSemana[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);

    const dataSets: Idatasets[] = [{
      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }


  createCakeDataBoletosAño(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.boletoData as IVentaResponseAño).VentaYear) {
      const keys = Object.keys((this.boletoData as IVentaResponseAño).VentaYear);

      // Procesar los elementos de VentaAño
      keys.forEach(key => {
        const items = (this.boletoData as IVentaResponseAño).VentaYear[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);

    const dataSets: Idatasets[] = [{
      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }

  extraerDataRecorridosMes() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.recorridoData as IVentaResponseMes).VentaMes) {
      const keys = Object.keys((this.recorridoData as IVentaResponseMes).VentaMes);

      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseMes).VentaMes[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }


    return data;
  }

  extraerDataRecorridosSemana() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.recorridoData as IVentaResponseSemana).VentaSemana) {
      const keys = Object.keys((this.recorridoData as IVentaResponseSemana).VentaSemana);

      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseSemana).VentaSemana[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }


    return data;
  }


  extraerDataRecorridosAño() {
    const data: IVentaItem[] = []
    // 1, 2, 3
    if ((this.recorridoData as IVentaResponseAño).VentaYear) {
      const keys = Object.keys((this.recorridoData as IVentaResponseAño).VentaYear);

      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseAño).VentaYear[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }


    return data;
  }

  createCakeDataRecorridoAño(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.recorridoData as IVentaResponseAño).VentaYear) {
      const keys = Object.keys((this.recorridoData as IVentaResponseAño).VentaYear);

      // Procesar los elementos de VentaAño
      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseAño).VentaYear[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);

    const dataSets: Idatasets[] = [{
      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }


  createCakeDataRecorridoMes(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.recorridoData as IVentaResponseMes).VentaMes) {
      const keys = Object.keys((this.recorridoData as IVentaResponseMes).VentaMes);

      // Procesar los elementos de VentaAño
      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseMes).VentaMes[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);


    const dataSets: Idatasets[] = [{

      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }

  createCakeDataRecorridoSemana(): IDataGraficsCake {
    // Inicializar los datos
    const data: IVentaItem[] = [];

    // Verificar si boletoData es del tipo IVentaResponseMes y tiene la propiedad VentaMes
    if ((this.recorridoData as IVentaResponseSemana).VentaSemana) {
      const keys = Object.keys((this.recorridoData as IVentaResponseSemana).VentaSemana);

      // Procesar los elementos de VentaAño
      keys.forEach(key => {
        const items = (this.recorridoData as IVentaResponseSemana).VentaSemana[key];
        if (items && items.length > 0) {
          data.push(items[0]);
        }
      });
    }

    // Generar las etiquetas y los conjuntos de datos para el gráfico
    const labels: string[] = data.map(item => item.titulo);

    const dataSets: Idatasets[] = [{
      label: 'Hola',
      data: data.map(item => parseInt(item.cantidad)),
      backgroundColor: ['#00C7F2', '#0FCA7A', '#FBC62F'],
      hoverOffset: 4
    }];

    // Devolver el objeto de datos gráfico
    return {
      labels,
      datasets: dataSets,
    };
  }


  transformarVentasParaChart(data: IDonacionResponse): IDataGraficsBar {
    const labels: string[] = [];
    const cantidades: number[] = [];


    // Recorremos las claves de VentaMes y sus valores
    console.log(data);

      data.donacion.forEach((donacion) => {
        labels.push(donacion.id.toString()); // Agregamos los títulos al eje X
        cantidades.push((parseInt(donacion.monto))); // Convertimos la cantidad a número
      });

    return {
      labels,
      datasets: [
        {
          label: undefined,
          data: cantidades,
          backgroundColor: "#4285F4",
        },
      ],
    };
  }


  reportesSemana(){
    this.cargandoGraphicaBoletos = true;
    this.graficaService.obtenerVentasBoletosSemana().subscribe(data => {
      this.boletoData = data;
      this.boletos = this.extraerDataBoletosSemana();
      this.boletosGraphicData = this.createCakeDataBoletosSemana();
      this.cargandoGraphicaBoletos = false;
    })


    this.cargandoGraphicaRecorridos = true;
    this.graficaService.obtenerVentasRecorridosSemana().subscribe(data => {
      this.recorridoData = data;
      this.recorridos = this.extraerDataRecorridosSemana();
      this.recorridosGraphicData = this.createCakeDataRecorridoSemana();
      this.cargandoGraphicaRecorridos = false;
    })

    this.cargandoDonacion = true;
    this.graficaService.obtenerDonacionesSemana().subscribe(data => {
      this.donacionesData = data;
      this.donacionesGraphicData = this.transformarVentasParaChart(data);
      this.cargandoDonacion = false;
    })

  }

  reportesMes(){
    this.cargandoGraphicaBoletos = true;
    this.graficaService.obtenerVentasBoletosMes().subscribe(data => {
      this.boletoData = data;
      this.boletos = this.extraerDataBoletosMes();
      this.boletosGraphicData = this.createCakeDataBoletosMes();
      this.cargandoGraphicaBoletos = false;
    })


    this.cargandoGraphicaRecorridos = true;
    this.graficaService.obtenerVentasRecorridosMes().subscribe(data => {
      this.recorridoData = data;
      this.recorridos = this.extraerDataRecorridosMes();
      this.recorridosGraphicData = this.createCakeDataRecorridoMes();
      this.cargandoGraphicaRecorridos = false;
    })

    this.cargandoDonacion = true;
    this.graficaService.obtenerDonacionesMes().subscribe(data => {
      this.donacionesData = data;
      this.donacionesGraphicData = this.transformarVentasParaChart(data);
      this.cargandoDonacion = false;
    })

  }


  reportesAno(){
    this.cargandoGraphicaBoletos = true;
    this.graficaService.obtenerVentasBoletosAño().subscribe(data => {
      this.boletoData = data;
      this.boletos = this.extraerDataBoletosAño();
      this.boletosGraphicData = this.createCakeDataBoletosAño();
      this.cargandoGraphicaBoletos = false;
    })


    this.cargandoGraphicaRecorridos = true;
    this.graficaService.obtenerVentasRecorridosAño().subscribe(data => {
      this.recorridoData = data;
      this.recorridos = this.extraerDataRecorridosAño();
      this.recorridosGraphicData = this.createCakeDataRecorridoAño();
      this.cargandoGraphicaRecorridos = false;
    })

    this.cargandoDonacion = true;
    this.graficaService.obtenerDonacionesAño().subscribe(data => {
      this.donacionesData = data;
      this.donacionesGraphicData = this.transformarVentasParaChart(data);
      this.cargandoDonacion = false;
    })

  }




}

