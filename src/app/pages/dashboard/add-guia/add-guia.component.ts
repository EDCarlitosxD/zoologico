import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-guia',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink],
  templateUrl: './add-guia.component.html',
  styleUrl: './add-guia.component.scss'
})
export class AddGuiaComponent {

}
