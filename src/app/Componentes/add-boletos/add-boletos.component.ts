import { Component, Input } from '@angular/core';
import { IBoleto } from '../../types/Boletos';

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
  @Input() addBoletos: IBoleto = {
    advertencias: '',
    descripcion: '',
    descripcion_card: '',
    estado: 1,
    imagen: '',
    precio: 233,
    titulo: '',
  }

  contador = 0

  minus(){
    if(this.contador === 0){
      return;
    }
    let contador = this.contador - 1;
    this.contador = contador;
    return contador;
  }
  plus(){
    let contador = this.contador + 1;
    this.contador = contador;
    return contador;
  }
}
