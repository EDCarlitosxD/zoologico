import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
//COMPONENTES

//PAGES


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarritoComponent],



  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Desplaza la página al tope
      }
    });
  }
  title = 'zoologico';
}
