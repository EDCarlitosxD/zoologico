import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DayHeaderContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { Evento, EventosPorDia } from '../../../types/Horario';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-edit-recorridos',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './edit-recorridos.component.html',
  styleUrl: './edit-recorridos.component.scss'
})
export class EditRecorridosComponent {
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


  handleEventClick(){

  }

}
