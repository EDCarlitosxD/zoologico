import { Component, Input, ViewChild } from '@angular/core';
import { ITour } from '../../types/Tour';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DayHeaderContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { Evento, EventosPorDia } from '../../types/Horario';
import dayGridPlugin from '@fullcalendar/daygrid'
import { RecorridoService } from '../../Services/recorrido.service';
import { CommonModule } from '@angular/common';
import { IReserva, IReservaInformacion } from '../../types/Reserva';
import { getUserDetails } from '../../utils/getUserDetails';
import { IRecorrido } from '../../types/Recorridos';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../Services/carrito.service';


import { WarningComponent } from "../warning/warning.component";

interface Tour {
  id: number;
  nombre: string,
  precio: number,
  img: string,
  valoracion: number,
  descripcionPrincipal: string,
  incluye: string,
  alReservar: string,
  contador: number,
  fecha: string,
  horario: number
}

@Component({
  selector: 'app-tour-component',
  standalone: true,
  imports: [WarningComponent, FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './tour-component.component.html',
  styleUrl: './tour-component.component.scss'
})
export class TourComponentComponent {

  constructor(private recorridoService: RecorridoService, private carritoServices: CarritoService){}


  @Input() tour: IRecorrido = {
    id: 0,
    titulo: 'Expedición de Animales Nocturnos',
    precio: 150,
    img_recorrido: 'img/pages/Recorridos/ExpediciónNocturna.png',
    valoracion: 5,
    descripcion: 'Sumérgete en el misterioso mundo de los animales nocturnos. Acompañado de un guía experto te permitirá observar cómo algunas especies se preparan para la noche\.',
    descripcion_incluye: '• Guía experto que te conducirá por las áreas nocturnas\.\n• Uso de linternas especiales para no alterar a los animales\.\n• Relatos sobre adaptaciones únicas al ambiente nocturno\.',
    descripcion_importante_reservar: '• Este Tour tiene una duración aproximada de 3 horas.\n• Se realiza en grupos pequeños para garantizar una experiencia tranquila.\n• Se recomienda llevar ropa abrigadora.',
    duracion: 1,
    estado: 1,
  }

  reserva: IReserva = {
    id_usuario: 0,
    id_horario_recorrido: 0,
    id_recorrido: 0,
    cantidad: 0,
    estado: true,
  }

  @ViewChild('calendarRecorrido') calendarComponent!: FullCalendarComponent;


  events: EventSourceInput = [];
  dataApi: EventosPorDia = {}
  horarioInput: Evento[] = [];
  horarioFin = '';
  calendarOptions: CalendarOptions = {
    locale: "es",
    // dayHeaderFormat: { weekday: 'narrow' },
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: '',
      right: '',
      center: 'title'
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

      return daysMap[args.text.toLowerCase() as keyof typeof daysMap] || args.text;
    },
    eventBackgroundColor: 'transparent',
    eventBorderColor: 'transparent',
    events: this.events,
    plugins: [dayGridPlugin],
    eventContent: this.customEventRender, // Personalizar contenido
    eventClick: this.handleEventClick.bind(this), // Manejar clics en eventos
  };

  personasValidate = false;
  horarioValidate = false


  minus() {
    if (this.reserva.cantidad === 0) {
      return;
    }
    let contador = this.reserva.cantidad! - 1;
    this.reserva.cantidad= contador;

    return contador;
  }
  plus() {
    let contador = this.reserva.cantidad!+ 1;
    this.reserva.cantidad = contador;
    return contador;
  }


  onHorarioInicioChange(event: Event) {
    const selectedHorarioInicio = (event.target as HTMLSelectElement).value;
    const selectedHorario = this.horarioInput.find(
      (horario: any) => horario.horario_inicio === selectedHorarioInicio
    );

    this.horarioFin = selectedHorario ? selectedHorario.horario_fin : '';
  }

  ngOnInit() {
    this.recorridoService.getHorarios(this.tour.id!).subscribe(data => {
      this.dataApi = data;

      this.events = Object.keys(data).map(key => {
        return {
          start: key,

        }
      });

      this.updateCalendar();
    })


    this.reserva.id_usuario = getUserDetails()?.user.id || 0;
    this.reserva.id_recorrido = this.tour.id;

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

    this.horarioFin = horario[0].horario_fin || '';
    alert(`Horario del evento en ${formattedDate}: ${JSON.stringify(horario)}`);
  }


  updateCalendar() {
    const calendariApi = this.calendarComponent.getApi();
    calendariApi.removeAllEvents();
    calendariApi.addEventSource(this.events);
  }





  changeInputHorario(event: Event){
    const selectedValue = parseInt((event.target as HTMLSelectElement).value);

    this.horarioFin = this.horarioInput.find(evento => evento.id === selectedValue)!.horario_fin;

  }



  agregarCarrito(){

    /**
     * Meter logica para enseñar alerta de errores
     */
    if(this.reserva.cantidad === 0){
      alert("Seleccione una cantidad de personas");
      return
    }else if(!this.reserva.id_horario_recorrido){
      alert("Selecciona una fecha");
      return
    }

    const reserva = {...this.reserva};
    const horarioInformacion = this.horarioInput.find(horarrio => this.reserva.id_horario_recorrido == horarrio.id);
    const tour: IRecorrido = this.tour;

    const informacionFront: IReservaInformacion = {
      horario: horarioInformacion!,
      reserva: reserva,
      tour: tour
    };


    console.log(reserva);


    this.carritoServices.addReserva(reserva,informacionFront);

    /**
     * Meter logica para enseñar alerta de añadio al carito
     */
    alert("Se añadio al carrito")


  }


}
