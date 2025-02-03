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

@Component({
  selector: 'app-edit-recorridos',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-recorridos.component.html',
  styleUrl: './edit-recorridos.component.scss'
})
export class EditRecorridosComponent {
  recorridoForm!: FormGroup;
  editado = false;
  id: number = 0;
  constructor(private location:Location, private recorridoService: RecorridoService, private route: ActivatedRoute, ){}


  ngOnInit(): void {
      // Cargamos los datos del animal desde el servicio
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recorridoService.getById(parseInt(id)).subscribe((data) => {
      this.recorrido = data;
      this.id = data.id!

    });

    this.recorridoService.getHorariosById(parseInt(id)).subscribe(data => this.horarios = data)

  }


  @Input() horarios: HorarioTour[] = [  ];


  recorrido: IRecorrido| null = null
  horario: HorarioTour = {
    fecha: '',
    horario_fin: '',
    horario_inicio: '',
    id_guia: 1
  }

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }

  toggleActive(horario: HorarioTour){
    horario.disponible = !horario.disponible;
    console.log(`${horario. fecha} is now ${horario.disponible ? 'active': 'inactive'}`);

  }


  onFileSelected(event: Event, input: string, property: keyof IRecorrido): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       (this.recorrido![property] as unknown as string) = reader.result as string; // Actualiza la propiedad dinámica
        this.recorridoForm.get(input)?.setValue(file);
        this.recorridoForm.get(input)?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    } else {
     (this.recorrido![property] as unknown as string) = '';
      this.recorridoForm.get(input)?.setErrors({ required: true });
    }
  }

  agregarHorario(){

    this.horario.horario_fin = this.horario.horario_fin + ":00"
    this.horario.horario_inicio = this.horario.horario_inicio + ":00"

    this.horarios.push(this.horario);
    this.horario = {
      fecha: '',
      horario_fin: '',
      horario_inicio: '',
      id_guia: this.horario.id_guia
    }
  }


  actualizar(){

    this.horarios.map(horario => {
       horario.horario_fin = horario.horario_fin + ":00"
      horario.horario_inicio = horario.horario_inicio + ":00"
    })

    const dataSave: IRecorridoSave ={
      ...this.recorrido!,
        horarios: this.horarios
    }

    console.log("DATA",dataSave);


    this.recorridoService.actualizarRecorrido(this.recorrido!.id!,dataSave).subscribe(data => alert("Se edito bien"));


  }



}
