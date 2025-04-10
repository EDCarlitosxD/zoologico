import { Component, Input, NgModule, OnInit } from '@angular/core';
import { SidebarUsuarioComponent } from '../../Componentes/Admin/sidebar-usuario/sidebar-usuario.component';
import { DashboardContentComponent } from '../../Componentes/Admin/dashboard-content/dashboard-content.component';
import { PerfilContentComponent } from '../../Componentes/Admin/perfil-content/perfil-content.component';
import { CommonModule, NgFor } from '@angular/common';
import { AddTarjetaComponent } from '../../Componentes/modals/add-tarjeta/add-tarjeta.component';
import { IUserDetails, RoleEnum, User } from '../../types/Auth';
import { AuthService } from '../../Services/auth.service';
import { InsigniaService } from '../../Services/insignia.service';
import { TarjetaService } from '../../Service/tarjeta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { IInsignia } from '../../types/Insignias';
import { catchError, of } from 'rxjs';

interface Perfil {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface Tarjetas {
  tarjeta: number;
}
@Component({
  selector: 'app-datos-perfil',
  standalone: true,
  imports: [
    NgFor,
    SidebarUsuarioComponent,
    DashboardContentComponent,
    PerfilContentComponent,
    AddTarjetaComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './datos-perfil.component.html',
  styleUrl: './datos-perfil.component.scss',
})
export class DatosPerfilComponent {
  perfil!: User;
  tarjetas: ITarjeta[] = [];
  insignia: IInsignia = {
    id: 0,
    imagen: '',
    nombre: '',
    cantidad: 0,
    estado: true,
  }; // Imagen por defecto
  editedUser: User = {
    id: 0,
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: RoleEnum.CLIENTE,
    estado: 1,
  };

  constructor(
    private userService: AuthService,
    private insigniaService: InsigniaService,
    private tarjetaService: TarjetaService
  ) {}

  ngOnInit(): void {
    // Cargar perfil
    this.userService.getUser().subscribe((res) => {
      this.perfil = res;
      this.editedUser = res;
      this.editedUser.password = '';
      this.obtenerInsignia();
    });

    // Cargar tarjetas
    this.tarjetaService.getTarjetas().subscribe((res) => {
      this.tarjetas = res;
    });
  }
  passwordConfirmation: string = '';

  obtenerInsignia(): void {
    if (this.perfil?.id) {
      this.insigniaService.getByUser(this.perfil.id).pipe(
        catchError((error) => {
          // Si hay un error (como 404), asigna "Sin insignia"
          this.insignia.nombre = 'Sin insignia';
          this.insignia.imagen = 'img/pages/loading/imgPerfil.png';  // Puedes asignar una imagen predeterminada si lo deseas
          return of(null);  // Devuelve un observable vacío
        })
      ).subscribe((res) => {
        // Aquí solo se ejecutará si no hubo error en la llamada
        if (res) {
          this.insignia.imagen = res.imagen ? res.imagen : 'img/pages/loading/imgPerfil.png';
          this.insignia.nombre = res.nombre ? 'Insignia de ' + res.nombre : 'Sin insignia';
        }
      });
    }
  }

  editarPerfil(event: Event) {
    event.preventDefault();
    if (this.editedUser.password !== this.passwordConfirmation) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    this.userService.updateUser(this.editedUser).subscribe({
      next: (res) => {
        alert('✅ Insignia editada correctamente.');
        window.location.reload();
        console.log(res);
      },
      error: (err) => {
        alert(
          '❌ Error al editar el insignia: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }

  eliminarTarjeta(id: number | undefined) {
    if (!id) return;
  
    const confirmacion = window.confirm('¿Estás seguro de eliminar la tarjeta?');
    if (!confirmacion) return;
  
    this.tarjetaService.eliminar(id).subscribe({
      next: () => {
        this.tarjetas = this.tarjetas.filter((tarjeta) => tarjeta.id !== id);
        alert('✅ Tarjeta eliminada correctamente.');
      },
      error: (err) => {
        alert(
          '❌ Error al eliminar la tarjeta: ' +
          (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }
}
