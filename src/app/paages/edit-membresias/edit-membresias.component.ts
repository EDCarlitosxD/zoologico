import { Component } from '@angular/core';
import { HeaderDashEditComponent } from '../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { IMembresia } from '../../types/Membresia';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MembresiasService } from '../../Services/membresias.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-membresias',
  standalone: true,
  imports: [
    HeaderDashEditComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-membresias.component.html',
  styleUrl: './edit-membresias.component.scss',
})
export class EditMembresiasComponent {
  constructor(
    private membresiasService: MembresiasService,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.membresiaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null, Validators.required],
    });
    const routeParams = this.activateRoute.snapshot.paramMap;
    const id: number = parseInt(routeParams.get('id')!);

    this.getById(id);
  }
  membresia: IMembresia = {
    id: 0,
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
    regalo_bienvenida: false,
    charlas_educativas: '',
    estado: true
  }
  membresiaForm!: FormGroup;

  onFileSelected(event: Event, property: keyof IMembresia): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        (this.membresia[property] as unknown as string) =
          reader.result as string; // Actualiza la propiedad dinámica
        const base64Image = reader.result as string;
        this.membresiaForm.patchValue({ imagen: base64Image });
        this.membresiaForm.get('imagen')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    } else {
      this.membresiaForm.patchValue({ imagen: null });
      this.membresiaForm.get('imagen')?.setErrors({ required: true });
    }
  }
  // onFileSelected(
  //   event: Event,
  //   input: string,
  //   property: keyof IMembresia
  // ): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       (this.membresia[property] as unknown as string) =
  //         reader.result as string; // Actualiza la propiedad dinámica
  //       this.membresiaForm.get(input)?.setValue(file);
  //       this.membresiaForm.get(input)?.updateValueAndValidity();
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     (this.membresia[property] as unknown as string) = '';
  //     this.membresiaForm.get(input)?.setErrors({ required: true });
  //   }
  // }

  getById(id: number): void {
    this.membresiasService.getById(id).subscribe({
      next: (membresia) => {
        this.membresia = membresia;
        this.membresiaForm.patchValue({
          nombre: membresia.nombre,
          precio: membresia.precio,
          imagen: membresia.imagen,
        });

        console.log('Membresía cargada:', this.membresiaForm.value);
      },
      error: (err) => {
        alert(
          '❌ Error al obtener la membresía: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }

  actualizarMembresia(event: Event): void {
    event.preventDefault();
    if (this.membresiaForm.invalid) {
      alert('⚠️ Completa todos los campos obligatorios.');
      return;
    }

    // 🔄 Fusiona datos actualizados del formulario con la membresía
    const updatedMembresia: IMembresia = {
      ...this.membresia,
      ...this.membresiaForm.value, // Usa los valores correctos
    };

    console.log('DATA ENVIADA:', updatedMembresia);

    this.membresiasService
      .update(updatedMembresia, updatedMembresia.id!)
      .subscribe({
        next: () => {
          alert('✅ Membresía editada correctamente.');
          window.location.reload();
        },
        error: (err) => {
          alert(
            '❌ Error al editar la membresía: ' +
              (err.error?.message || err.message || 'Inténtalo de nuevo.')
          );
        },
      });
  }
}
