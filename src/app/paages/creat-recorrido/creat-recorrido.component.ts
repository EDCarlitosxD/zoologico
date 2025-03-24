import { Component } from '@angular/core';
import { HorarioTour } from '../../types/Horario';
import { IRecorrido } from '../../types/Recorridos';
import { RecorridoService } from '../../Services/recorrido.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { GuiaService } from '../../Services/guia.service';
import { IGuia } from '../../types/Guias';


export interface IRecorridoForm{
  id?: number;
  titulo: string;
  precio: number ; // Si prefieres que sea un número, cámbialo a `number`.
  descripcion: string;
  descripcion_incluye: string;
  descripcion_importante_reservar: string;
  img_recorrido: string | File | undefined;
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

  constructor(private recorridoService :RecorridoService, private guiaService: GuiaService, private location: Location){}

  guias: IGuia[] = []
  horarios: HorarioTour[] = []

  horario: HorarioTour = {
    fecha: '',
    horario_fin: '',
    horario_inicio: '',
    id_guia: undefined as unknown as number
  }


  recorrido: IRecorrido = {
    descripcion: '',
    descripcion_importante_reservar: '',
    descripcion_incluye: '',
    duracion: undefined as unknown as number, // 👈 Inicializado sin valor
    img_recorrido: '',
    precio: undefined as unknown as number,   // 👈 Inicializado sin valor
    titulo: '',
  };

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

  selectedGuia: number | null = null; // Al inicio, no hay guía seleccionada

  agregarHorario() {
    if (!this.selectedGuia) {
      alert("❌ Debes seleccionar un guía antes de agregar el horario.");
      return;
    }

    if (!this.horario.fecha || !this.horario.horario_fin || !this.horario.horario_inicio) {
      alert("❌ Debes completar todos los campos antes de agregar el horario.");
      return;
    }
  
    this.horario.horario_fin = this.horario.horario_fin + ":00";
    this.horario.horario_inicio = this.horario.horario_inicio + ":00";
    this.horario.id_guia = this.selectedGuia; // ✅ Asigna correctamente la guía seleccionada
  
    this.horarios.push({ ...this.horario }); // Clonar para evitar referencias
  
    // Reiniciar valores para el próximo horario
    this.horario = {
      fecha: '',
      horario_fin: '',
      horario_inicio: '',
      id_guia: this.selectedGuia
    };
  
    console.log("✅ Horario agregado:", this.horario);
  }
  
  convertirDuracionATime(duracion: string): string {
    // Verificar que la duración esté en formato HH:MM
    const duracionRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  
    if (!duracionRegex.test(duracion)) {
      console.error("❌ Formato de duración inválido:", duracion);
      return '';
    }
  
    const [horas, minutos] = duracion.split(":").map(Number);
  
    // Crear un objeto Date con la duración
    const fecha = new Date();
    fecha.setHours(horas, minutos, 0); // HH:MM:SS
  
    // Convertirlo a formato `time` para HTML
    return fecha.toTimeString().slice(0, 5); // "HH:MM"
  }
  guardar(){
    //this.recorrido.duracion = this.convertirDuracionATime(this.recorrido.duracion);
    const dataSave: IRecorridoSave ={
      ...this.recorrido,
        horarios: this.horarios
    }


    console.log(dataSave);

    this.recorridoService.guardarRecorrido(dataSave).subscribe(data => alert("Se guardo bien"));
  }

  goBack(){
    this.location.back();

  }

}
