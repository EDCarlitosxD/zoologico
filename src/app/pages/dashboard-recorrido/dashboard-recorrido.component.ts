import { Component, Input, input } from '@angular/core';
import { DashboardContentComponent } from '../../Componentes/Admin/dashboard-content/dashboard-content.component';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecorridoService } from '../../Services/recorrido.service';
import { IReservaDashboard } from '../../types/Reserva';
import { CargandoComponent } from '../../Componentes/cargando/cargando.component';
import { GuiaService } from '../../Services/guia.service';
import { IGuia } from '../../types/Guias';
import { IInsignia } from '../../types/Insignias';
import { InsigniaService } from '../../Services/insignia.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export interface IRecorridoAdmin {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  duracion: string;
  estado: boolean; // Agregado: Estado activo/inactivo
}
// interface RecorridosVendidos {

// }

@Component({
  selector: 'app-dashboard-recorrido',
  standalone: true,
  imports: [
    DashboardContentComponent,
    NgClass,
    NgFor,
    NgIf,
    RouterLink,
    CargandoComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './dashboard-recorrido.component.html',
  styleUrl: './dashboard-recorrido.component.scss',
})
export class DashboardRecorridoComponent {
  constructor(
    private recorridoService: RecorridoService,
    private guiasService: GuiaService,
    private insigniasService: InsigniaService,
    private fb: FormBuilder
  ) {
    this.insigniaForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      estado: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      imagen: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.recorridoService.getRecorridos().subscribe((data) => {
      this.recs = data;
      this.cargandoTours = false;
      console.log(data);
    });

    this.recorridoService.getReservasDashboard().subscribe((data) => {
      this.reservas = data.data;
      this.cargandoReservas = false;
    });

    this.guiasService.getAll().subscribe((data) => {
      this.guides = data;
      this.cargandoGuias = false;
    });

    this.insigniasService.getAll().subscribe((data) => {
      this.insignias = data;
      this.cargandoInsignias = false;
    });
  }

  private logAllErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control && control.errors) {
        console.log(`Errores en el campo "${field}":`, control.errors);
      }
      if (control instanceof FormGroup) {
        this.logAllErrors(control); // Verifica errores en subgrupos, si existen
      }
    });
  }

  cargandoTours = true;
  cargandoReservas = true;
  cargandoGuias = true;
  cargandoInsignias = false;
  recs: IRecorridoAdmin[] = [];
  reservas: IReservaDashboard[] = [];

  insigniaForm!: FormGroup;

  insignias: IInsignia[] = [];
  guides: IGuia[] = [];
  insignia: IInsignia = {
    id: 0,
    nombre: '',
    imagen: '',
    cantidad: 1,
    estado: true,
  };

  // Método para alternar el estado activo/inactivo
  toggleActiveRec(row: IRecorridoAdmin): void {
    row.estado = !row.estado; // Cambia el valor de estado
    this.recorridoService
      .actualizarEstadoRecorrido(row.estado, row.id)
      .subscribe((data) => console.log(data));
  }
  toggleActiveGuide(row: IGuia): void {
    row.estado = !row.estado; // Cambia el estado estado/inactivo
    this.guiasService
      .actualizarEstado(row.estado, row.id!)
      .subscribe((data) => console.log(data));
  }
  toggleActiveInsignia(row: IInsignia): void {
    row.estado = !row.estado; // Cambia el estado estado/inactivo
    this.insigniasService
      .actualizarEstado(row.estado, row.id!)
      .subscribe((data) => console.log(data));
  }

  onFileSelected(event: Event, input: string, property: keyof IInsignia): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        (this.insignia[property] as unknown as string) =
          reader.result as string; // Actualiza la propiedad dinámica
        this.insigniaForm.get(input)?.setValue(file);
        this.insigniaForm.get(input)?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    } else {
      (this.insignia[property] as unknown as string) = '';
      this.insigniaForm.get(input)?.setErrors({ required: true });
    }
  }

  guardarInsignia(event: Event) {
    event.preventDefault();

    console.log(this.insignia);

    this.insigniasService.guardarInsignia(this.insignia).subscribe({
      next: () => {
        alert('✅ Insignia agregada correctamente.');
          window.location.reload();

      },
      error: (err) => {
        alert(
          '❌ Error al editar el insignia: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }

  editarInsignia(event: Event) {
    event.preventDefault();

    this.insigniasService
      .editarInsignia(this.insignia, this.insignia.id!)
      .subscribe({
        next: () => {
          alert('✅ Insignia editada correctamente.');
          window.location.reload();
        },
        error: (err) => {
          alert(
            '❌ Error al editar el insignia: ' +
              (err.error?.message || err.message || 'Inténtalo de nuevo.')
          );
        },
      })

  }

  getInsigniasById(id: number | null | undefined) {
    if (!id){
      this.insignia = {
        id: 0,
        nombre: '',
        imagen: '',
        cantidad: 1,
        estado: true
      }
      return
    };
    this.insignia.id = id;
    this.insigniasService 
      .getById(this.insignia.id!) 
      .subscribe((data) => {
        this.insignia = data;
      });
  }
}
