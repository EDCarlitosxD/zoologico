import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
interface Footer{

}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() footer:Footer = {

  };

}
