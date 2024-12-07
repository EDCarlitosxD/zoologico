import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-boleto',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink],
  templateUrl: './edit-boleto.component.html',
  styleUrl: './edit-boleto.component.scss'
})
export class EditBoletoComponent {

}
