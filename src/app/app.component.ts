import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavBarComponent } from './Componentes/nav-bar/nav-bar.component';
import { FooterComponent } from './Componentes/footer/footer.component';

//COMPONENTES

//PAGES


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    NavBarComponent,
    FooterComponent
    ],



  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zoologico';
}
