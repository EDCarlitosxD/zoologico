import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginFormApi } from '../Componentes/login-form/login-form.component';
import { Observable } from 'rxjs';
import { AuthResponse, IUserDetails, RoleEnum } from '../types/Auth';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: loginFormApi): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/login`,loginData, {observe: 'response'});
  }


  isAdmin(){
    const userDetails: IUserDetails = JSON.parse( localStorage.getItem('userDetails')!);
    return userDetails.user.rol === RoleEnum.ADMIN;
  }

}
