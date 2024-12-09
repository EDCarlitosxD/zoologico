import { Component } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { RouterLink } from '@angular/router';
import { GuiaService } from '../../../Services/guia.service';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { IGuia } from '../../../types/Guias';

@Component({
  selector: 'app-add-guia',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink],
  templateUrl: './add-guia.component.html',
  styleUrl: './add-guia.component.scss'
})
export class AddGuiaComponent {
  guiaForm: FormGroup;
  guardado = false;

  guiaI: IGuia = {
    "id": null,
    "nombre_completo": "",
    "disponible": true,
    "estado": true,
  }
  constructor(private location: Location, private guia: GuiaService, private fb: FormBuilder){
    this.guiaForm = this.fb.group({
      nombre_completo: [''],
      disponible: [true],
      estado: [true],
    })
  }

  guardarGuia(event: Event){
    event.preventDefault();
    if (this.guiaForm.valid) {
      this.guiaI = this.guiaForm.value; // Capturar los datos
      console.log(this.guiaI);

      this.guia.guardarGuia(this.guiaI).subscribe(data => this.guardado = true);
      alert("SE guardo correctamente")
      this.guiaForm.reset(); // Limpia el formulario después de guardar
    } else {
      alert('Error de validación. Por favor, revisa los campos.');
      console.log(this.logAllErrors(this.guiaForm))
      this.markAllFieldsAsTouched(); // Resalta los errores
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
