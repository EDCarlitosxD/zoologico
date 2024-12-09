import { Component } from '@angular/core';
import { HorarioTour } from '../../types/Horario';
import { IRecorrido } from '../../types/Recorridos';
import { RecorridoService } from '../../Services/recorrido.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuiaService } from '../../Services/guia.service';
import { IGuia } from '../../types/Guias';


export interface IRecorridoForm{
  id?: number;
  titulo: string;
  precio: number; // Si prefieres que sea un número, cámbialo a `number`.
  descripcion: string;
  descripcion_incluye: string;
  descripcion_importante_reservar: string;
  img_recorrido: string | File;
  duracion: string | number; // En minutos
  valoracion?: number;

  // cantidad_personas: number;
  // precio_persona_extra: number; // También se puede cambiar a `number` si es necesario.
  estado?: number; // Puede representar un booleano o un estado específico
  created_at?: string; // Fecha en formato ISO
  updated_at?: string; // Fecha en formato ISO
}

export interface IRecorridoSave extends IRecorridoForm {
  horarios: HorarioTour[];
}

@Component({
  selector: 'app-creat-recorrido',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './creat-recorrido.component.html',
  styleUrl: './creat-recorrido.component.scss'
})
export class CreatRecorridoComponent {

  constructor(private recorridoService :RecorridoService, private guiaService: GuiaService){}

  guias: IGuia[] = []
  horarios: HorarioTour[] = []

  recorrido: IRecorrido = {
  descripcion: '',
  descripcion_importante_reservar: '',
  descripcion_incluye: '',
  duracion: 0,
  img_recorrido: '',
  precio: 2,
  titulo: '',
}

ngOnInit(){
  this.guiaService.getAll().subscribe(data => this.guias = data)
}

imageBackground: string = 'none';

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0]; // Obtener el archivo seleccionado
    this.recorrido.img_recorrido = file ; // Guardar el nombre del archivo si lo deseas

    // Crear una URL para la vista previa
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBackground = `url('${reader.result}')` // Asignar como fondo
    };
    reader.readAsDataURL(file); // Leer el archivo como DataURL
  }


  }


  guardar(){
    const dataSave: IRecorridoSave ={
      ...this.recorrido,
        horarios: this.horarios
    }

    this.recorridoService.guardarRecorrido(dataSave).subscribe(data => alert("Se guardo bien"));
  }

  goBack(){

  }

}
