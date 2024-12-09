import { Component } from '@angular/core';
import { NavBarComponent } from "../../Componentes/nav-bar/nav-bar.component";
import { FooterComponent } from '../../Componentes/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../Service/contacto.service';

export interface IFormContacto{
  nombre: string,
  telefono: string,
  mensaje: string,
  email: string
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
  contactoForm!: FormGroup;
  correoEnviado = false;

  constructor(private fb: FormBuilder, private contactoService: ContactoService){}

  ngOnInit(): void {
    // Inicializamos el formulario vacío
    this.contactoForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      nombre: ['', Validators.required],
      teleono: ['',Validators.required],
    });
  }



  contacto: IFormContacto = {
     email: '',
     mensaje: '',
     nombre: '',
     telefono: '',
  }


  enviar(){
    console.log(this.contacto);

    this.contactoService.enviarMensaje(this.contacto).subscribe(data => {
      console.log(data);
      this.correoEnviado = true;
    })
  }

}
