import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { IAnimal } from '../../types/Animales';
import { AnimalService } from '../../Services/animal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-create-animales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-animales.component.html',
  styleUrl: './create-animales.component.scss'
})
export class CreateAnimalesComponent {
  constructor(private location: Location, private animalService: AnimalService, private fb: FormBuilder){
    this.animalForm = this.fb.group({
      nombre: ['', Validators.required],
      nombre_cientifico: ['', Validators.required],
      habitat: ['', Validators.required],
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      subtitulo: ['', Validators.required],
      datos_curiosos: ['', Validators.required],
      caracteristicas_fisicas: ['', Validators.required],
      dieta: ['', Validators.required],
      comportamiento: ['', Validators.required],
      estado: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      imagen_principal: [null,Validators.required,],
      imagen_secundaria: [null,Validators.required],
      img_ubicacion: [null,Validators.required],

    });


  }
  animalForm: FormGroup;
  guardado = false;

  animal: IAnimal = {
    id: null,
    nombre: '',
    nombre_cientifico: '',
    imagen_principal: '',
    imagen_secundaria: '',
    caracteristicas_fisicas: '',
    dieta: '',
    datos_curiosos: '',
    comportamiento: '',
    peso: '',
    altura: '',
    tipo: '',
    habitat: '',
    descripcion: '',
    subtitulo: '',
    qr: '',
    img_ubicacion: '',
    estado: true,
    slug: ''
    };

  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }


  guardarAnimal(event: Event){
    event.preventDefault();

    if (this.animalForm.valid) {
      this.animal = this.animalForm.value; // Capturar los datos
      console.log(this.animal);

      this.animalService.guardarAnimal(this.animal).subscribe(data => this.guardado = true);
      alert("SE guardo correctamente")
      this.animalForm.reset(); // Limpia el formulario después de guardar
    } else {
      alert('Error de validación. Por favor, revisa los campos.');
      console.log(this.logAllErrors(this.animalForm))
      this.markAllFieldsAsTouched(); // Resalta los errores
    }
  }




  onFileSelected(event: Event, input: string, property: keyof IAnimal): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
       (this.animal[property] as unknown as string) = reader.result as string; // Actualiza la propiedad dinámica
        this.animalForm.get(input)?.setValue(file);
        this.animalForm.get(input)?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    } else {
     (this.animal[property] as unknown as string) = '';
      this.animalForm.get(input)?.setErrors({ required: true });
    }
  }










  private markAllFieldsAsTouched(): void {
    Object.keys(this.animalForm.controls).forEach((field) => {
      const control = this.animalForm.get(field);
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
