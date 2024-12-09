import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecorridoService } from '../../../Services/recorrido.service';
import { ITourGuardar } from '../../../types/Tour';
import { HorarioTour } from '../../../types/Horario';


@Component({
  selector: 'app-add-reco',
  standalone: true,
  templateUrl: './add-reco.component.html',
  styleUrls: ['./add-reco.component.scss']
})
export class AddRecoComponent implements OnInit {
  tourForm!: FormGroup;
  horarios!: FormArray; // Para manejar horarios dinámicos
  editado = false;
  id: number | null = 0;

  constructor(
    private location: Location,
    private tourService: RecorridoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario principal
    this.tourForm = this.fb.group({
      titulo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      duracion: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcion_incluye: ['', Validators.required],
      descripcion_importante_reservar: ['', Validators.required],
      img_recorrido: [null, Validators.required],
      horarios: this.fb.array([
        this.fb.group({
          horario_inicio: ['', Validators.required],
          id_guia: ['', Validators.required],
          fecha: ['', Validators.required],
          horario_fin: ['', Validators.required],
        })
      ]) // Inicializamos como un arreglo vacío
    });

    // Agregamos un horario por defecto al formulario
    this.horarios = this.tourForm.get('horarios') as FormArray;
    this.agregarHorario();
  }

  tour: ITourGuardar = {
    titulo: '',
    precio: 0,
    duracion: 0,
    descripcion: '',
    descripcion_incluye: '',
    descripcion_importante_reservar: '',
    img_recorrido: '',
    horarios: []
  }
  // Método para agregar un nuevo horario al FormArray
  agregarHorario(): void {
    const horarioGroup = this.fb.group({
      fecha: ['', Validators.required],
      horario_inicio: ['', Validators.required],
      horario_fin: ['', Validators.required],
      id_guia: ['', Validators.required],
      estado: ['', Validators.required]// Estado predeterminado como activo
    });
    this.horarios.push(horarioGroup);
  }



  // Método para gestionar la carga de imágenes
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.tourForm.get('img_recorrido')?.setValue(file);
      this.tourForm.get('img_recorrido')?.updateValueAndValidity();
    }
  }

  // Método para guardar el tour
  guardarTour(event: Event): void {
    event.preventDefault();
    if (this.tourForm.valid) {
      this.tour = this.tourForm.value;
      this.tourService.guardarRecorrido(this.tour).subscribe(data => this.editado = true);
      }else{
        alert('Error de validación. Por favor, revisa los campos.');
      console.log(this.logAllErrors(this.tourForm))
      this.markAllFieldsAsTouched(); // Resalta los errores
      }
    }


  // Marca todos los campos del formulario como tocados para mostrar errores
  private markAllFieldsAsTouched(): void {
    Object.keys(this.tourForm.controls).forEach((field) => {
      const control = this.tourForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  private logAllErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control && control.errors) {
        console.log(`Errores en el campo "${field}":`, control.errors);
      }
      if (control instanceof FormGroup) {
        this.logAllErrors(control); // Verifica errores en subgrupos, si existen
      }
    });
  }



  goBack(): void {
    this.location.back();
  }
}
