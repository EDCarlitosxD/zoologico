import { Component } from '@angular/core';
import { IRecorrido } from '../../types/Recorridos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioTour } from '../../types/Horario';
import { RecorridoHomeComponent } from '../../Componentes/recorrido-home/recorrido-home.component';
import { RecorridoService } from '../../Services/recorrido.service';

@Component({
  selector: 'app-create-boleto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-boleto.component.html',
  styleUrl: './create-boleto.component.scss'
})
export class CreateBoletoComponent {

}
