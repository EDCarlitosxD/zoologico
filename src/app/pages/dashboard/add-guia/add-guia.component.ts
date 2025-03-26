import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';
import { GuiaService } from '../../../Services/guia.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IGuia } from '../../../types/Guias';

@Component({
  selector: 'app-add-guia',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './add-guia.component.html',
  styleUrl: './add-guia.component.scss'
})
export class AddGuiaComponent {
  guiaForm: FormGroup;
  guardado = false;

  guiaI: IGuia = {
    "id": null,
    "nombre_completo": "",
    "disponible": null,
    "estado": null
  }
  constructor(private guia: GuiaService, private fb: FormBuilder){
    this.guiaForm = this.fb.group({
      nombre_completo: ['', Validators.required],
    })
  }

  guardarGuia(event: Event) {
    event.preventDefault();
    this.guiaI = {
      ...this.guiaForm.value,
    };
  
    console.log('Datos enviados:', this.guiaI);
  
    if (this.guiaForm.valid) {
      this.guia.guardarGuia(this.guiaI).subscribe({
        next: (data) => {
          this.guardado = true;
          alert("Se guardó correctamente");
          this.guiaForm.reset();
        },
        error: (error) => {
          console.error('Error en la petición:', error);
        }
      });
    } else {
      alert('Error de validación. Revisa los campos.');
      this.markAllFieldsAsTouched();
    }
  }
  


  private markAllFieldsAsTouched(): void {
    Object.keys(this.guiaForm.controls).forEach((field) => {
      const control = this.guiaForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  private logAllErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control && control.errors) {
        console.log(`Errores en el campo "${field}":`, control.errors);
      }
      if (control instanceof FormGroup) {
        this.logAllErrors(control); // Verifica errores en subgrupos, si existen
      }
    });
  }


}