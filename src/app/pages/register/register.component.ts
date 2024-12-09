import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VerificandoMailComponent } from "../../Componentes/modals/verificando-mail/verificando-mail.component";
import { MailVerificadoComponent } from "../../Componentes/modals/mail-verificado/mail-verificado.component";
import { FormsModule } from '@angular/forms';
import { RoleEnum, User } from '../../types/Auth';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, VerificandoMailComponent, CommonModule, FormsModule,MailVerificadoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private location: Location,private authService: AuthService) {}
  registrado = false;
  user: User = {
      apellido: '',
      password: '',
      email: '',
      estado: 1,
      id: 0,
      nombre: '',
      nombre_usuario: '',
      rol: RoleEnum.CLIENTE
  }

  confirmPassword= ''



  guardar(){
    if(this.user.password === this.confirmPassword){
      this.authService.register(this.user).subscribe(data => this.registrado = true);
    }
    console.log('nocoincide');

  }

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial


  }
}
