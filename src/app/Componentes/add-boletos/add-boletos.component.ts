import { Component, Input } from '@angular/core';

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
  @Input() addBoletos: addBoletos = {
    image: '',
    description: '',
    type: '',
    price: 0,
    contador: 0,
    nota: ''
  }
    
  minus(){
    if(this.addBoletos.contador === 0){
      return;
    }
    let contador = this.addBoletos.contador - 1;
    this.addBoletos.contador = contador;
    return contador;
  }
  plus(){
    let contador = this.addBoletos.contador + 1;
    this.addBoletos.contador = contador;
    return contador;
  }
}
