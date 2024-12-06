import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderDashEditComponent } from '../../../Componentes/Admin/header-dash-edit/header-dash-edit.component';
import { GuiaService } from '../../../Services/guia.service';
import { ActivatedRoute } from '@angular/router';
import { IGuia } from '../../../types/Guias';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-guias',
  standalone: true,
  imports: [FormsModule, CommonModule,HeaderDashEditComponent],
  templateUrl: './edit-guias.component.html',
  styleUrl: './edit-guias.component.scss'
})
export class EditGuiasComponent {
  constructor(private location: Location, private guiaService: GuiaService, private activateRoute: ActivatedRoute) {}

  isAlertVisible = false;

  guia: IGuia = {
    disponible: true,
    estado: true,
    id: null,
    nombre_completo: ''
  }


  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }

  ngOnInit() {
    const routeParams = this.activateRoute.snapshot.paramMap;
    const id: number = parseInt(routeParams.get('id')!);

    this.guiaService.getById(id).subscribe(data => this.guia = data);
  }



  editarGuia(event:Event){
    event.preventDefault()
    this.guiaService.updateGuia(this.guia, this.guia.id!).subscribe(data => this.isAlertVisible = true);
  }

}
