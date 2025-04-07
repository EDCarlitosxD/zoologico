import { MembresiasService } from './../../../Services/membresias.service';
import { Component, Input } from '@angular/core';
import { IMembresia } from '../../../types/Membresia';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membresia-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './membresia-home.component.html',
  styleUrl: './membresia-home.component.scss'
})
export class MembresiaHomeComponent {
    @Input() id = 0;
  
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
    estado: true
  }
  constructor(private membresiasService: MembresiasService) { }
  ngOnInit(): void {
    this.getData()
    
  }
  getData() {
    this.membresiasService.getById(this.id).subscribe(res => {
      this.membresia = res; // Aquí asignamos la respuesta correctamente
      console.log(this.membresia);
    });
  }
}
