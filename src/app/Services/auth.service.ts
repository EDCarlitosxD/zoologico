import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginFormApi } from '../Componentes/login-form/login-form.component';
import { Observable } from 'rxjs';
import { AuthResponse, IUserDetails, RoleEnum, User } from '../types/Auth';
import { environment } from '../environment';
import { getUserDetails } from '../utils/getUserDetails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.userDetails = getUserDetails();
  }
  userDetails: IUserDetails | null;
  login(loginData: loginFormApi): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${environment.API_URL}/login`,
      loginData,
      { observe: 'response' }
    );
  }
  getUserMembership(userId: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${environment.API_URL}/user/membership/${userId}`,
      { observe: 'response' }
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userDetails'); // Verifica si hay un token guardado
  }

  register(registerData: User) {
    return this.http.post(`${environment.API_URL}/register`, registerData);
  }

  isAdmin() {
    const userDetails: IUserDetails = JSON.parse(
      localStorage.getItem('userDetails')!
    );
    return userDetails.user.rol === RoleEnum.ADMIN;
  }

  getUser() {
    return this.http.get<User>(`${environment.API_URL}/user/`, {
      headers: { Authorization: `Bearer ${this.userDetails?.token}` },
    });
  }

  updateUser(user: User) {
    return this.http.put<User>(`${environment.API_URL}/cuenta`, user, {
      headers: { Authorization: `Bearer ${this.userDetails?.token}` },
    });
  }
}
