import { Component } from '@angular/core';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TarjetaService } from '../../Service/tarjeta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { DonacionService } from '../../Service/donacion.service';


export interface IDonacion {
  'monto' : number,
}

@Component({
  selector: 'app-pagar-donacion',
  standalone: true,
  imports: [RouterLink, AddTarjetaComponent, AtrasBtnComponent, FormsModule, CommonModule],
  templateUrl: './pagar-donacion.component.html',
  styleUrl: './pagar-donacion.component.scss'
})
export class PagarDonacionComponent {
  constructor(private tarjetasService: TarjetaService,private donacionService: DonacionService, private router: Router) { }
  tarjetas: ITarjeta[] = [];
  tarjetaSeleccionada: ITarjeta | null = null;

  donacion: IDonacion = {
    'monto': 0
  }


  ngOnInit() {
    this.tarjetasService.getTarjetas().subscribe(data => this.tarjetas = data);


  }

  changePrecio(monto: number){
    this.donacion.monto = monto
  }


  eliminarTarjeta(id: number) {
    this.tarjetasService.eliminar(id).subscribe(data => {
      this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id != id);
    });
  }



  donacionPagar(){
    this.router.navigate(['/loading']).then(() => {
      this.donacionService.hacerDonacion(this.donacion).subscribe({
        next: (data) => {
          console.log('SE LOGRO LA VENTA!!!!!');
          console.log(data);

          // Guarda los datos de la venta y navega a la página "Venta hecha"
          this.router.navigate(['/donaciones/pagar/gracias'], {
            state: { monto: this.donacion.monto, tarjeta: this.tarjetaSeleccionada } // Pasar los datos como `state`
          });
        },
        error: (err) => {
          console.error('Error al realizar la venta:', err);
          // Manejar errores si es necesario
        }
      });
    });
  }

}
