import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAnimal } from '../../types/Animales';
import { AnimalService } from '../../Services/animal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-animal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-animal.component.html',
  styleUrl: './edit-animal.component.scss'
})
export class EditAnimalComponent implements OnInit {


  constructor(private location: Location, private animalService: AnimalService, private fb: FormBuilder, private route: ActivatedRoute){}

  ngOnInit(): void {
    // Inicializamos el formulario vacío
    this.animalForm = this.fb.group({
      nombre: ['', Validators.required],
      nombre_cientifico: ['', Validators.required],
      habitat: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      subtitulo: ['', Validators.required],
      datos_curiosos: ['', Validators.required],
      caracteristicas_fisicas: ['', Validators.required],
      dieta: ['', Validators.required],
      comportamiento: ['', Validators.required],
      imagen_principal: [null],
      imagen_secundaria: [null],
      img_ubicacion: [null],
    });

    // Cargamos los datos del animal desde el servicio
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.animalService.getAnimal(slug).subscribe((data) => {
      this.animal = data;
      this.id = data.id

      // Actualizamos el formulario con los datos recibidos
      this.animalForm.patchValue({
        nombre: this.animal.nombre,
        nombre_cientifico: this.animal.nombre_cientifico,
        habitat: this.animal.habitat,
        peso: this.animal.peso,
        altura: this.animal.altura,
        tipo: this.animal.tipo,
        descripcion: this.animal.descripcion,
        subtitulo: this.animal.subtitulo,
        datos_curiosos: this.animal.datos_curiosos,
        caracteristicas_fisicas: this.animal.caracteristicas_fisicas,
        dieta: this.animal.dieta,
        comportamiento: this.animal.comportamiento,
        imagen_principal: this.animal.imagen_principal,
        imagen_secundaria: this.animal.imagen_secundaria,
        img_ubicacion: this.animal.img_ubicacion,
      });
    });
  }



  animalForm!: FormGroup;
  editado = false;
  id: number| null = 0;

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




  guardarAnimal(event: Event){
    event.preventDefault();

    if (this.animalForm.valid) {
      this.animal = this.animalForm.value; // Capturar los datos

      this.animalService.editarAnimal(this.animal,this.id!).subscribe(data => this.editado = true);
      // this.animalForm.reset(); // Limpia el formulario después de guardar
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



  goBack(): void {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
