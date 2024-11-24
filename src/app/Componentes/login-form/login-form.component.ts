import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
interface LoginForm{
  title: string;
  subtitle: string;
  type: string;
  aText: string;
}
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input() login: LoginForm = {
    title: '',
    subtitle: '',
    type: '',
    aText: ''
  }
}
