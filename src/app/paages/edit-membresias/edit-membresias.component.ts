import { Component } from '@angular/core';
import { HeaderDashEditComponent } from '../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { IMembresia } from '../../types/Membresia';
import { FormsModule } from '@angular/forms';
import { MembresiasService } from '../../Services/membresias.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-membresias',
  standalone: true,
  imports: [HeaderDashEditComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './edit-membresias.component.html',
  styleUrl: './edit-membresias.component.scss',
})
export class EditMembresiasComponent {
  constructor(
    private membresiasService: MembresiasService,
    private activateRoute: ActivatedRoute
  ) {}

  habilitarDescuentoRentaEspacios: boolean = false;
  habilitarDescuentoSouvenirs: boolean = false;
  habilitarDescuentoTours: boolean = false;
  habilitarRegalo: boolean = false;

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
    regalo_bienvenida: '',
    charlas_educativas: false,
    estado: true,
  };

  ngOnInit(): void {
    // Inicializar estados de checkboxes
    this.habilitarDescuentoRentaEspacios =
      this.membresia.descuento_renta_espacios_eventos > 0;
    this.habilitarDescuentoSouvenirs =
      this.membresia.descuento_alimentos_souvenirs > 0;
    this.habilitarDescuentoTours = this.membresia.descuento_tours > 0;
    this.habilitarRegalo = this.membresia.regalo_bienvenida !== null;

    // Obtener ID de la URL
    const routeParams = this.activateRoute.snapshot.paramMap;
    const id: number = parseInt(routeParams.get('id')!);
    this.getById(id);
  }

  toggleDescuento(tipo: string) {
    if (tipo === 'Souvenirs') {
      this.habilitarDescuentoSouvenirs = !this.habilitarDescuentoSouvenirs;
      if (!this.habilitarDescuentoSouvenirs) {
        this.membresia.descuento_alimentos_souvenirs = 0;
      }
    }
    if (tipo === 'Tours') {
      this.habilitarDescuentoTours = !this.habilitarDescuentoTours;
      if (!this.habilitarDescuentoTours) {
        this.membresia.descuento_tours = 0;
      }
    }
    if (tipo === 'Espacio') {
      this.habilitarDescuentoRentaEspacios =
        !this.habilitarDescuentoRentaEspacios;
      if (!this.habilitarDescuentoRentaEspacios) {
        this.membresia.descuento_renta_espacios_eventos = 0;
      }
    }
    if (tipo === 'Regalo') {
      this.habilitarRegalo = !this.habilitarRegalo;
      if (!this.habilitarRegalo) {
        this.membresia.regalo_bienvenida = '';
      }
    }
  }

  onFileSelected(event: Event, property: keyof IMembresia): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Fix the type issue with a proper type assertion
        (this.membresia as any)[property] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getById(id: number): void {
    this.membresiasService.getById(id).subscribe({
      next: (membresia) => {
        // Convertir los valores booleanos correctamente
        membresia.entradas_ilimitadas = membresia.entradas_ilimitadas;
        membresia.acceso_eventos = membresia.acceso_eventos;
        membresia.experiencias_animales = membresia.experiencias_animales;
        membresia.estacionamiento_preferencial =
        membresia.estacionamiento_preferencial;
        membresia.detras_camaras = membresia.detras_camaras;
        membresia.recorrido_vip_gratuito = membresia.recorrido_vip_gratuito;
        membresia.programas_conservacion = membresia.programas_conservacion;
        membresia.charlas_educativas = membresia.charlas_educativas;

        // Asignar la membresia al modelo
        this.membresia = membresia;

        // Actualizar estados de los checkboxes adicionales
        this.habilitarDescuentoSouvenirs = this.membresia.descuento_alimentos_souvenirs > 0 ? true : false;
        this.habilitarDescuentoTours = this.membresia.descuento_tours > 0 ? true : false;
        this.habilitarDescuentoRentaEspacios = this.membresia.descuento_renta_espacios_eventos > 0 ? true : false;
        this.habilitarRegalo = this.membresia.regalo_bienvenida !== null ? true : false;

        console.log('Membresía cargada:', this.membresia);
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

    console.log('DATA ENVIADA:', this.membresia);

    if(this.membresia.regalo_bienvenida == null) this.membresia.regalo_bienvenida = '';
    this.membresiasService
      .update(this.membresia, this.membresia.id!)
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
