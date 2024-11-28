import { Component } from '@angular/core';
import { AddBoletosComponent } from "../../Componentes/add-boletos/add-boletos.component";
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";
import { BoletosService } from '../../Services/boletos.service';
import { IBoleto } from '../../types/Boletos';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [AddBoletosComponent, NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent {

  constructor(private boletosServices: BoletosService){}
  boletos: IBoleto[] = []


ngOnInit(){

  this.boletosServices.getAllBoletos(1).subscribe(data => this.boletos = data);
}
}
