import { Component, Input } from '@angular/core';
import { IMembresia, IMembresiaCard } from '../../../types/Membresia';
import { MembresiasService } from '../../../Services/membresias.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { getUserDetails } from '../../../utils/getUserDetails';

@Component({
  selector: 'app-membresia-active',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './membresia-active.component.html',
  styleUrl: './membresia-active.component.scss'
})
export class MembresiaActiveComponent {
  @Input() m: IMembresiaCard = {
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
  };
  constructor(private membresiaService: MembresiasService, private router: Router) {}
  comprarMembresia(membresia: any) {
    if(!getUserDetails()){
      alert('Error al comprar la membresia, necesitas iniciar sesion para proceder  ');
      return
    }
    this.membresiaService.setMembresia(membresia);
    this.router.navigate(['/membresias/pagar']); // ✅ Correcto
  }
}
