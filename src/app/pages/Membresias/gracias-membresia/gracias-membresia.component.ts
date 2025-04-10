import { Component } from '@angular/core';
import { ITarjeta } from '../../../types/Tarjetas';
import { RouterLink, Router } from '@angular/router';
import { IMembresia, IMembresiaShort, IMembresiaUser } from '../../../types/Membresia';
import { MembresiasService } from '../../../Services/membresias.service';
import { RoundPipe } from '../../../Pipes/round.pipe';

@Component({
  selector: 'app-gracias-membresia',
  standalone: true,
  imports: [
    RouterLink,
    RoundPipe,

  ],
  templateUrl: './gracias-membresia.component.html',
  styleUrl: './gracias-membresia.component.scss'
})
export class GraciasMembresiaComponent {

  monto = 0;
  tarjeta: ITarjeta|null = null

  constructor(private router: Router, private membresiasService: MembresiasService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { monto:number; tarjeta: ITarjeta }; // Tipar explícitamente el state
    this.monto = state?.monto;
    this.tarjeta = state?.tarjeta;
  }

  mu :IMembresiaUser = {
    id_membresia: 0,
    id_usuario: 0,
    meses: 0,
    precio_total: 0,
    img: ''
  };

  m: IMembresiaShort = {
    id: 0,
    nombre: '',
    precio: 0,
    imagen: '',
  };
  ngOnInit(): void {
    this.mu =this.membresiasService.getMembresia()
    this.mu.precio_total = this.mu.meses * this.mu.precio_total
    this.membresiasService.getById(this.mu.id_membresia).subscribe((data) => {
      (this.m = data)
    });
  }
}
