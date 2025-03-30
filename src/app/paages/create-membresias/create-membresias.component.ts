import { Component } from '@angular/core';
import { IMembresia } from '../../types/Membresia';
import { HeaderDashEditComponent } from '../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
    this.membresiaForm = this.fb.group({
          nombre: ['', Validators.required],
          precio: [0, Validators.required],
          descripcion: ['', Validators.required],
          imagen: [null, Validators.required],
        });
  }
  membresia: IMembresia = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
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

  agregarMembresia(event: Event): void {
    event.preventDefault();

    console.log(this.membresia);

    this.membresiasService.create(this.membresia).subscribe({
      next: () => {
        alert('✅ Membresia agregada correctamente.');      },
      error: (err) => {
        alert(
          '❌ Error al crear la membresia: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }
}
