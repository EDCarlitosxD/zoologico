import { Component, ViewChild } from '@angular/core';
import { NavBarComponent } from '../../Componentes/nav-bar/nav-bar.component';
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { SelectorRecorridoComponent } from "../../Componentes/selector-recorrido/selector-recorrido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { TourComponentComponent } from "../../Componentes/tour-component/tour-component.component";
import { RouterLink } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core/index.js';
import { RecorridoService } from '../../Services/recorrido.service';
import { Evento, EventosPorDia } from '../../types/Horario';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid'
@Component({
  selector: 'app-recorridos',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FooterComponent, SelectorRecorridoComponent, IndicadorComponent, AddBoletosComponent, TourComponentComponent,FullCalendarModule, CommonModule],
  templateUrl: './recorridos.component.html',
  styleUrl: './recorridos.component.scss'
})
export class RecorridosComponent {

  constructor(private recorridoService: RecorridoService) { }

  cantidadPersonas = 0;


  @ViewChild('calendarRecorrido') calendarComponent!: FullCalendarComponent;

  events: EventSourceInput = [];
  dataApi: EventosPorDia = {}
  horarioInput: Evento[] = [];
  horarioFin = '';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      right: 'prev,next',
    },
    eventBackgroundColor: 'transparent',
    eventBorderColor: 'transparent',
    events: this.events,
    plugins: [dayGridPlugin],
    eventContent: this.customEventRender, // Personalizar contenido
    eventClick: this.handleEventClick.bind(this), // Manejar clics en eventos
  };

  personasExtraMenos(){
    if(this.cantidadPersonas === 0)return;
    this.cantidadPersonas--;
  }

  personasExtraMas(){
    this.cantidadPersonas++;
  }

  onHorarioInicioChange(event: Event) {
    const selectedHorarioInicio = (event.target as HTMLSelectElement).value;
    const selectedHorario = this.horarioInput.find(
      (horario: any) => horario.horario_inicio === selectedHorarioInicio
    );

    this.horarioFin = selectedHorario ? selectedHorario.horario_fin : '';
  }

  ngOnInit() {
    this.recorridoService.getHorarios(1).subscribe(data => {
      this.dataApi = data;
      console.log(data);

      this.events = Object.keys(data).map(key => {
        return {
          start: key,

        }
      });


      this.updateCalendar();
    })



  }


  // Función para personalizar los eventos
  customEventRender(eventInfo: any) {
    // Crear contenedor principal
    const container = document.createElement('div');
    container.textContent = eventInfo.event.title;

    // Cambiar color si hay recorrido disponible
    container.style.backgroundColor = 'green';
    container.style.color = 'white';
    container.style.borderRadius = '50px';
    // container.style.padding = '15px 15px';
    container.style.height = '30px';
    container.style.width = '30px';
    container.style.margin = '0 auto';

    return { domNodes: [container] };
  }

  // Función para manejar clics en eventos
  handleEventClick(clickInfo: any) {
    const formattedDate = clickInfo.event.start.toISOString().split('T')[0];
    // Buscar en dataApi usando el formato correcto
    const horario = this.dataApi[formattedDate];
    this.horarioInput = horario;
    console.log('Horario:', horario);

    this.horarioFin = horario[0].horario_fin || '';
    alert(`Horario del evento en ${formattedDate}: ${JSON.stringify(horario)}`);
  }


  updateCalendar() {
    const calendariApi = this.calendarComponent.getApi();
    calendariApi.removeAllEvents();
    calendariApi.addEventSource(this.events);
  }

}
