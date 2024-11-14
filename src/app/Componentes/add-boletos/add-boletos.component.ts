import { Component, Input } from '@angular/core';

interface addBoletos{
  image: string;
  type: string;
  price: string;
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
  type: '',
  price: ''
}
}
