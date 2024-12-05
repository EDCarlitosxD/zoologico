import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './donaciones.component.html',
  styleUrl: './donaciones.component.scss'
})
export class DonacionesComponent implements AfterViewInit {
  @ViewChildren('imagenesDonacionContenido') contenedores!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Aplica el comportamiento a cada contenedor
    this.contenedores.forEach((contenedorRef) => {
      const contenedor = contenedorRef.nativeElement;

      if (contenedor) {
        // Lleva el scroll al inicio
        contenedor.scrollLeft = 0;

        // Si deseas centrar un punto específico, ajusta el valor de scrollLeft
        // contenedor.scrollLeft = contenedor.scrollWidth / 2;
      }
    });
  }
}