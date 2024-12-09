import { Component, Input } from '@angular/core';
import { IBoleto } from '../../types/Boletos';
import { CarritoService } from '../../Services/carrito.service';

interface addBoletos{
  image: string;
  type: string;
  description: string;
  price: number;
  contador: number;
  nota: string;
}
@Component({
  selector: 'app-add-boletos',
  standalone: true,
  imports: [],
  templateUrl: './add-boletos.component.html',
  styleUrls: ['./add-boletos.component.scss']
})
export class AddBoletosComponent {

  constructor(private carritoService: CarritoService){}

  @Input() addBoletos: IBoleto = {
    advertencias: '',
    descripcion: '',
    descripcion_card: '',
    estado: 1,
    imagen: '',
    precio: 233,
    titulo: '',
  }




  @Input() contador = 0

  minus(){
    this.carritoService.decrementarBoleto(this.addBoletos.id!);
  }
  plus(){
    this.carritoService.decrementarBoleto(this.addBoletos.id!)
  }
}
