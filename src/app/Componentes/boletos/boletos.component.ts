import { Component, Input } from '@angular/core';
interface Boletos{
  title: string;
  description: string;
  age: string;
  price: string;
  type: string;
  image: string;
}
@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.scss'
})
export class BoletosComponent {
 @Input() boleto: Boletos = {
  title: '',
  description: '',
  age: '',
  price: '',
  type: '',
  image: ''
 }
}
