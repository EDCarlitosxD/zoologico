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

  showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

  loginForm: loginFormApi = {
    email: '',
    password: ''
  }


  errors: string[] = [];


// ANGULAR (AL HACER CLICK AL BOTON)
loginPeticion() {
  this.authService.login(this.loginForm).pipe(
    catchError((error: HttpErrorResponse) => {
      this.errors = error.error.errors
      console.log(error);
      console.log(this.errors);
      return of(null);
    })
  ).subscribe(data => {
    if (data) {
      console.log(data);
      
      // Después de login exitoso, obtener información de membresía
      this.authService.getUserMembership(data.body!.user.id).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('Error al obtener membresía:', error);
          // Si hay error, guardamos los datos del usuario sin membresía
          const userData = {
            ...data.body,
            membership: null
          };
          localStorage.setItem("userDetails", JSON.stringify(userData));
          return of(null);
        })
      ).subscribe(membershipData => {
        // Combinar los datos del usuario con los datos de membresía
        const userData = {
          ...data.body, 
          membership: membershipData?.body || null
        };
        
        // Guardar en localStorage
        localStorage.setItem("userDetails", JSON.stringify(userData));
        
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
        alert('Bienvenido');
      });
    }
  });
}

}
