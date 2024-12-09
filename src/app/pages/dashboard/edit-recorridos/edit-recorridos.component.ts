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
import { Evento, EventosPorDia } from '../../../types/Horario';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { IRecorrido } from '../../../types/Recorridos';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RecorridoService } from '../../../Services/recorrido.service';

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
  constructor(private location:Location, private recorridoService: RecorridoService,private route: ActivatedRoute, ){}


  ngOnInit(): void {
      // Cargamos los datos del animal desde el servicio
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recorridoService.getById(parseInt(id)).subscribe((data) => {
      this.recorrido = data;
      this.id = data.id!

    });
  }


  @Input() horarios: Horario[] = [
    { fecha: "15 septiembre", hora: "13:30", guia: "Adrian Hernandez", active: true },
    { fecha: "16 septiembre", hora: "10:00", guia: "Maria Lopez", active: false },
    { fecha: "17 septiembre", hora: "12:45", guia: "Carlos Perez", active: true },
    { fecha: "18 septiembre", hora: "15:30", guia: "Laura Martinez", active: true },
    { fecha: "19 septiembre", hora: "09:00", guia: "Jose Garcia", active: false },
    { fecha: "20 septiembre", hora: "17:00", guia: "Ana Rivera", active: true },
    { fecha: "21 septiembre", hora: "11:15", guia: "Luis Sanchez", active: false }
  ];


  recorrido: IRecorrido| null = null


  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }

  toggleActive(horario: Horario){
    horario.active = !horario.active;
    console.log(`${horario. fecha} is now ${horario.active ? 'active': 'inactive'}`);

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






}
