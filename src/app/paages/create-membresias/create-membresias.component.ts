import { Component } from '@angular/core';
import { IMembresia } from '../../types/Membresia';
import { HeaderDashEditComponent } from '../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MembresiasService } from '../../Services/membresias.service';

@Component({
  selector: 'app-create-membresias',
  standalone: true,
  imports: [HeaderDashEditComponent, CommonModule, FormsModule],
  templateUrl: './create-membresias.component.html',
  styleUrl: './create-membresias.component.scss',
})
export class CreateMembresiasComponent {
  constructor(
    private membresiasService: MembresiasService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.habilitarDescuentoRentaEspacios = false;
    this.habilitarDescuentoSouvenirs = false;
    this.habilitarDescuentoTours = false;
    this.habilitarRegalo = false;
    this.membresiaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      imagen: [null, Validators.required],
      entradas_ilimitadas: [false, Validators.required],
      descuento_alimentos_souvenirs: [0, Validators.required],
      acceso_eventos: [false, Validators.required],
      descuento_tours: [0, Validators.required],
      experiencias_animales: [false, Validators.required],
      estacionamiento_preferencial: [false, Validators.required],
      detras_camaras: [false, Validators.required],
      recorrido_vip_gratuito: [false, Validators.required],
      programas_conservacion: [false, Validators.required],
      descuento_renta_espacios_eventos: [0, Validators.required],
      precio_especial_invitados: [0, Validators.required],
      regalo_bienvenida: ['', Validators.required],
      charlas_educativas: [false, Validators.required],      
    });

  }
  
  habilitarDescuentoRentaEspacios: boolean = false;
  habilitarDescuentoSouvenirs: boolean = false;
  habilitarDescuentoTours: boolean = false;
  habilitarRegalo: boolean = false;
  membresia: IMembresia = {
    id: null,
    nombre: '',
    precio: 0,
    imagen: '',
    entradas_ilimitadas: false,
    descuento_alimentos_souvenirs: 0,
    acceso_eventos: false,
    descuento_tours: 0,
    experiencias_animales: false,
    estacionamiento_preferencial: false,
    detras_camaras: false,
    recorrido_vip_gratuito: false,
    programas_conservacion: false,
    descuento_renta_espacios_eventos: 0,
    precio_especial_invitados: 0,
    regalo_bienvenida: '',
    charlas_educativas: false,
    estado: true,
  };
  membresiaForm!: FormGroup;

  onFileSelected(
    event: Event,
    input: string,
    property: keyof IMembresia
  ): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        (this.membresia[property] as unknown as string) =
          reader.result as string; // Actualiza la propiedad dinámica
        this.membresiaForm.get(input)?.setValue(file);
        this.membresiaForm.get(input)?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    } else {
      (this.membresia[property] as unknown as string) = '';
      this.membresiaForm.get(input)?.setErrors({ required: true });
    }
  }

  toggleDescuento(tipo: string) {
    if (tipo === 'Souvenirs') {
      this.habilitarDescuentoSouvenirs = !this.habilitarDescuentoSouvenirs;
      if (!this.habilitarDescuentoSouvenirs) {
        this.membresia.descuento_alimentos_souvenirs = 0; // Reinicia el valor si se deshabilita
      }
    }
    if (tipo === 'Tours') {
      this.habilitarDescuentoTours = !this.habilitarDescuentoTours;
      if (!this.habilitarDescuentoTours) {
        this.membresia.descuento_tours = 0; // Reinicia el valor si se deshabilita
      }
    }
    if (tipo === 'Espacio') {
      this.habilitarDescuentoRentaEspacios = !this.habilitarDescuentoRentaEspacios;
      if (!this.habilitarDescuentoRentaEspacios) {
        this.membresia.descuento_renta_espacios_eventos = 0; // Reinicia el valor si se deshabilita
      }
    }
    if (tipo === 'Regalo'){
      this.habilitarRegalo = !this.habilitarRegalo;
      if (!this.habilitarRegalo) {
        this.membresia.regalo_bienvenida = ""; // Reinicia el valor si se deshabilita
      }
    }
  }
  
  agregarMembresia(event: Event): void {
    event.preventDefault();

    console.log(this.membresia);

    this.membresiasService.create(this.membresia).subscribe({
      next: () => {
        alert('✅ Membresia agregada correctamente.');
      },
      error: (err) => {
        alert(
          '❌ Error al crear la membresia: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }
}
