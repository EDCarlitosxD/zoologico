import { IGuia } from './../../../types/Guias';
import {  CommonModule, NgFor } from '@angular/common';
import {  Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Horario{
  fecha: string;
  hora: string;
  guia: string;
  active: boolean;
}
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DayHeaderContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { Evento, EventosPorDia, HorarioTour } from '../../../types/Horario';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { IRecorrido } from '../../../types/Recorridos';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RecorridoService } from '../../../Services/recorrido.service';
import { IRecorridoSave } from '../../../paages/creat-recorrido/creat-recorrido.component';
import { GuiaService } from '../../../Services/guia.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-edit-recorridos',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-recorridos.component.html',
  styleUrl: './edit-recorridos.component.scss'
})
export class EditRecorridosComponent {
  duracionHoras: number = 1;
  duracionMinutos: number = 0;
  recorridoForm!: FormGroup;
  editado = false;
  id: number = 0;
  constructor(private location:Location,
    private guiaService: GuiaService
     ,private recorridoService: RecorridoService, private route: ActivatedRoute, ){}


  ngOnInit(): void {
      // Cargamos los datos del animal desde el servicio
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.recorridoService.getById(parseInt(id)).subscribe((data) => {
      this.recorrido = data;

      this.id = data.id!


      this.obtenerDuracion();

    });

    this.getGuias();
    this.recorridoService.getHorariosById(parseInt(id)).subscribe(data => this.horarios = data)

  }

  getGuias() {
    this.guiaService.getAll().subscribe(
      (data: IGuia[]) => { 
        this.guias = data; 
      }
    );
  }

  @Input() horarios: HorarioTour[] = [  ];


  recorrido: IRecorrido| null = null
  horario: HorarioTour = {
    id: undefined as unknown as number,
    fecha: '',
    horario_fin: '',
    horario_inicio: '',
    id_guia: undefined as unknown as number,
  }
  actualizarDuracion() {
    // Convertir a string con dos dígitos
    const horas = this.duracionHoras*3600;
    const minutos = this.duracionMinutos*60;
    
    // Formar duración en formato HH:MM:00
    
    const duracion = horas + minutos;
    
    this.recorrido!.duracion = duracion;
  }
  imageBackground: string = 'none';

obtenerDuracion() {
  const duracion = this.recorrido?.duracion.toString();
  const horas = duracion?.slice(0, 2) + ':' + duracion?.slice(2);
  const minutos = duracion?.slice(3, 5) + ':' + duracion?.slice(6);
  this.duracionHoras = parseInt(horas!);
  this.duracionMinutos = parseInt(minutos!);

 }
  guias: IGuia[] = [];

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
  // toggleActiveRec(row: IRecorridoAdmin): void {
  //   row.estado = !row.estado; // Cambia el valor de estado
  //   this.recorridoService.actualizarEstadoRecorrido(row.estado,row.id).subscribe(data => console.log(data));

  // }
  toggleActive(horario: HorarioTour){
    horario.disponible = !horario.disponible;

    this.recorridoService.actualizarEstadoHorario(horario.disponible, horario.id).subscribe(data => console.log(data));
    
    console.log(`${horario. fecha} is now ${horario.disponible ? 'active': 'inactive'}`);
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files[0]) {
      const file = input.files[0]; // Obtener el archivo seleccionado
      this.recorrido!.img_recorrido = file ; // Guardar el nombre del archivo si lo deseas
  
      // Crear una URL para la vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBackground = `url('${reader.result}')` // Asignar como fondo
      };
      reader.readAsDataURL(file); // Leer el archivo como DataURL
    }
  
    
  
    }

  // onFileSelected(event: Event, input: string, property: keyof IRecorrido): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //      (this.recorrido![property] as unknown as string) = reader.result as string; // Actualiza la propiedad dinámica
  //       this.recorridoForm.get(input)?.setValue(file);
  //       this.recorridoForm.get(input)?.updateValueAndValidity();
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //    (this.recorrido![property] as unknown as string) = '';
  //     this.recorridoForm.get(input)?.setErrors({ required: true });
  //   }
  // }
  selectedGuia: number | null = null; // Al inicio, no hay guía seleccionada

  agregarHorario() {
    if (!this.selectedGuia) {
      alert("❌ Debes seleccionar un guía antes de agregar el horario.");
      return;
    }

    if (!this.horario.fecha || !this.horario.horario_fin || !this.horario.horario_inicio) {
      alert("❌ Debes completar todos los campos antes de agregar el horario.");
      console.log(this.horario);
      return;
    }
  
    this.horario.horario_fin = this.horario.horario_fin + ":00";
    this.horario.horario_inicio = this.horario.horario_inicio + ":00";
    this.horario.id_guia = this.selectedGuia; // ✅ Asigna correctamente la guía seleccionada
    this.horario.disponible = true;
    this.horarios.push({ ...this.horario }); // Clonar para evitar referencias

    console.log("✅ Horario agregado:", this.horario);
    
    // Reiniciar valores para el próximo horario
    this.horario = {
      id: 0,
      fecha: '',
      horario_fin: '',
      horario_inicio: '',
      id_guia: this.selectedGuia
    };
  
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

  actualizar(){


    const duracionSegundos = this.recorrido!.duracion;  // Suponiendo que la duración está en segundos
    let duracionFormateada = duracionSegundos.toString();
    console.log(duracionSegundos, duracionFormateada);
    // Convertir segundos a horas, minutos y segundos
    if (typeof duracionSegundos === 'number' && !isNaN(duracionSegundos)){
    //   const horas = Math.floor(duracionSegundos / 3600);
    // const minutos = Math.floor((duracionSegundos % 3600) / 60);
    // const segundos = duracionSegundos % 60;
    const formatedTime = this.recorridoService.formatDurationToTime(duracionSegundos);
    this.recorrido!.duracion = formatedTime;
    // // Formatear a dos dígitos
    // duracionFormateada = `${this.padZero(horas)}:${this.padZero(minutos)}:${this.padZero(segundos)}`;
    }

    // Preparar los datos para guardar
    const dataSave: IRecorridoSave = {
        ...this.recorrido!,
        horarios: this.horarios
    };
    

    console.log("DATA",dataSave);
    console.log("DATA ENVIADA:", JSON.stringify(dataSave, null, 2));

    console.log(this.recorrido!.id);
    this.recorridoService.actualizarRecorrido(this.recorrido!.id!,dataSave).subscribe(data => alert("Se edito bien"));


  }



}
