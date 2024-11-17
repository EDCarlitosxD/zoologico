import { Component, Input } from '@angular/core';
interface Footer{

}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() footer:Footer = {

  };

}
