import {  NgFor } from '@angular/common';
import {  Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Horario{
  fecha: string;
  hora: string;
  guia: string;
  active: boolean;
}
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DayHeaderContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { Evento, EventosPorDia } from '../../../types/Horario';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-edit-recorridos',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './edit-recorridos.component.html',
  styleUrl: './edit-recorridos.component.scss'
})
export class EditRecorridosComponent {
  @Input() horarios: Horario[] = [
    { fecha: "15 septiembre", hora: "13:30", guia: "Adrian Hernandez", active: true },
    { fecha: "16 septiembre", hora: "10:00", guia: "Maria Lopez", active: false },
    { fecha: "17 septiembre", hora: "12:45", guia: "Carlos Perez", active: true },
    { fecha: "18 septiembre", hora: "15:30", guia: "Laura Martinez", active: true },
    { fecha: "19 septiembre", hora: "09:00", guia: "Jose Garcia", active: false },
    { fecha: "20 septiembre", hora: "17:00", guia: "Ana Rivera", active: true },
    { fecha: "21 septiembre", hora: "11:15", guia: "Luis Sanchez", active: false }
  ];

  constructor(private location: Location) {}
  @ViewChild('recorridoEdit') calendarComponent!: FullCalendarComponent;


  events: EventSourceInput = [];
  calendarOptions: CalendarOptions = {
    locale: "es",
    // dayHeaderFormat: { weekday: 'narrow' },
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      end: 'prev,next',
    },
    dayHeaderContent: function (args: DayHeaderContentArg) {
      // Personalizar para mostrar solo la primera letra, con miércoles como "M"
      const daysMap = {
        'dom': 'D',
        'lun': 'L',
        'mar': 'M',
        'mié': 'M',
        'jue': 'J',
        'vie': 'V',
        'sáb': 'S',
      };
      console.log(args.text);

      return daysMap[args.text.toLowerCase() as keyof typeof daysMap] || args.text;
    },
    eventBackgroundColor: 'transparent',
    eventBorderColor: 'transparent',
    events: this.events,
    plugins: [dayGridPlugin],
    // eventContent: this.customEventRender, // Personalizar contenido
    eventClick: this.handleEventClick.bind(this), // Manejar clics en eventos
  };


  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }

  toggleActive(horario: Horario){
    horario.active = !horario.active;
    console.log(`${horario. fecha} is now ${horario.active ? 'active': 'inactive'}`);

  }




  handleEventClick(){

  }

}
