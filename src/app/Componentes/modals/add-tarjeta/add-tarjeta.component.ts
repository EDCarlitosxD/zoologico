import { Component, EventEmitter, Output } from '@angular/core';
import { TarjetaService } from '../../../Service/tarjeta.service';
import { ITarjeta } from '../../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tarjeta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-tarjeta.component.html',
  styleUrl: './add-tarjeta.component.scss'
})
export class AddTarjetaComponent {


  constructor(private tarjetaService: TarjetaService){}
  @Output() tarjetaGuardada = new EventEmitter<ITarjeta>();
  tarjeta: ITarjeta = {
    banco: 'Tilin',
    ccv: '',
    fecha_expiracion: '',
    id_usuario: 0,
    nombre_tarjeta: '',
    numero_tarjeta: '',
    tipo_tarjeta: 'VISA',
  }

  guardarTarjeta(){
    console.log(this.tarjeta);

    this.tarjetaService.guardar(this.tarjeta).subscribe(data => {
      this.tarjeta = data;
      this.tarjetaGuardada.emit(this.tarjeta);
    });

  }

}
