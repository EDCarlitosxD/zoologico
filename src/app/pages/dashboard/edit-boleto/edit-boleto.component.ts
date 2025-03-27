import { Component, OnInit } from '@angular/core';
import { HeaderDashEditComponent } from "../../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BoletosService } from '../../../Services/boletos.service';
import { IBoleto } from '../../../types/Boletos';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-boleto',
  standalone: true,
  imports: [HeaderDashEditComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-boleto.component.html',
  styleUrl: './edit-boleto.component.scss'
})
export class EditBoletoComponent {
  constructor(private location: Location, private boletoService: BoletosService , private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  goBack(): void {
    this.location.back();
  }
  boletoForm!: FormGroup;

  boleto: IBoleto = {
    id: null,
    titulo: "",
    descripcion_card: "",
    descripcion: "",
    advertencias: "",
    precio: 0, // Si el precio debe ser tratado como número, puedes usar `number` en lugar de `string`.
    estado: 1, // Probablemente 1 para activo y 0 para inactivo.
    imagen: "", // URL de la imagen.
  };
  ngOnInit(): void {
    this.boletoForm = this.fb.group({
          titulo: ['', Validators.required],
          descripcion_card: ['', Validators.required],
          descripcion: ['', Validators.required],
          advertencias: ['', Validators.required],
          precio: ['', [Validators.required, Validators.min(0)]],
          imagen: [null],
        })
    const routeParams = this.activateRoute.snapshot.paramMap;
    const id: number = parseInt(routeParams.get('id')!);
    
    this.boletoService.getById(id).subscribe(data => {
      this.boleto = data;
      this.boleto.imagen = this.boleto.imagen || '';
    });
    this.boletoForm.patchValue({
      titulo: this.boleto.titulo,
      descripcion_card: this.boleto.descripcion_card,
      descripcion: this.boleto.descripcion,
      advertencias: this.boleto.advertencias,
      precio: this.boleto.precio,
      imagen: this.boleto.imagen
    });
    console.log(this.boleto);
    }

    isAlertVisible: boolean = false;
    editarBoleto(event: Event) {
      event.preventDefault();
  
      console.log(this.boleto);
      this.boletoService.updateBoleto(this.boleto.id!, this.boleto)
      .subscribe({
        next: () => {
          alert("✅ Boleto editado correctamente.");
          //window.location.reload()
        },
        error: (err) => {
          alert("❌ Error al editar el boleto: " + (err.error?.message || err.message || "Inténtalo de nuevo."));
        }
      });
    }

    onFileSelected(
        event: Event,
        input: string,
        property: keyof IBoleto
      ): void {
        const file = (event.target as HTMLInputElement).files?.[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            (this.boleto[property] as unknown as string) =
              reader.result as string; // Actualiza la propiedad dinámica
            this.boletoForm.get(input)?.setValue(file);
            this.boletoForm.get(input)?.updateValueAndValidity();
          };
          reader.readAsDataURL(file);
        } else {
          (this.boleto[property] as unknown as string) = '';
          this.boletoForm.get(input)?.setErrors({ required: true });
        }
      }
}
