import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boleto',
  standalone: true,
  imports: [],
  templateUrl: './boleto.component.html',
  styleUrl: './boleto.component.scss'
})
export class BoletoComponent {
  @Input() titulo = "";
  @Input() precio = "";
  @Input() descripcion = "";
  @Input() img = "";
  @Input() saltosDeLinea: boolean = false; // Bandera para controlar el formato


  get descripcionFormateada(): string {
    return this.saltosDeLinea
      ? this.descripcion.replace(/\n/g, '<br>')
      : this.descripcion;
  }
}
