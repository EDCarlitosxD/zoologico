import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
interface LoginForm {
  title: string;
  subtitle: string;
  type: string;
  aText: string;
}

export interface loginFormApi {
  email: string,
  password: string
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor(private authService: AuthService, private router: Router, private location : Location) { }

  @Input() login: LoginForm = {
    title: '',
    subtitle: '',
    type: '',
    aText: ''
  }

  loginForm: loginFormApi = {
    email: '',
    password: ''
  }


  errors: string[] = [];


  loginPeticion() {
    this.authService.login(this.loginForm).pipe(catchError((error: HttpErrorResponse) => {
      this.errors = error.error.errors
      console.log(error);

      console.log(this.errors);

      return of(null);
    })
    ).subscribe(data => {
      if (data) {
        console.log(data);
        localStorage.setItem("userDetails",JSON.stringify(data.body))
        this.location.back();
        // this.router.navigate([this.previosRoute.getPreviousUrl()]);
      }
    })


  }

}
