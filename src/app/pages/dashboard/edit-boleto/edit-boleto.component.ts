import { Component, OnInit } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BoletosService } from '../../../Services/boletos.service';
import { IBoleto } from '../../../types/Boletos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-boleto',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-boleto.component.html',
  styleUrl: './edit-boleto.component.scss'
})
export class EditBoletoComponent {
  constructor(private location: Location, private boletoService: BoletosService , private activateRoute: ActivatedRoute) {}
  goBack(): void {
    this.location.back();
  }

  boleto: IBoleto = {
    id: null,
    titulo: "",
    descripcion_card: "",
    descripcion: "",
    advertencias: "",
    precio: 0, // Si el precio debe ser tratado como número, puedes usar `number` en lugar de `string`.
    estado: 1, // Probablemente 1 para activo y 0 para inactivo.
    imagen: "", // URL de la imagen.
  };
  ngOnInit(): void {
    const routeParams = this.activateRoute.snapshot.paramMap;
    const id: number = parseInt(routeParams.get('id')!);

    this.boletoService.getById(id).subscribe(data => this.boleto = data);
    console.log(this.boleto);
    }

    isAlertVisible: boolean = false;
    editarBoleto(event: Event) {
      event.preventDefault();
      this.boletoService.updateBoleto(this.boleto.id!, this.boleto).subscribe(data => this.isAlertVisible = true);
    }
}
