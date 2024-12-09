import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permite el acceso si el usuario está autenticado
    }

    // Muestra un alert al usuario
    alert('Debes estar logueado para seguir con su proceso.');

    // Redirige al inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
}
