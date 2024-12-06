import { Component, Input } from '@angular/core';
import { AtrasBtnComponent } from '../../atras-btn/atras-btn.component';

@Component({
  selector: 'app-header-dash-edit',
  standalone: true,
  imports: [AtrasBtnComponent],
  templateUrl: './header-dash-edit.component.html',
  styleUrl: './header-dash-edit.component.scss'
})
export class HeaderDashEditComponent {
  @Input() title = '';
  @Input() subtitle = '';


  
}
