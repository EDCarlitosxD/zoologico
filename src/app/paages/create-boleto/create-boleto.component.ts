import { Component } from '@angular/core';
import { IRecorrido } from '../../types/Recorridos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HorarioTour } from '../../types/Horario';
import { RecorridoHomeComponent } from '../../Componentes/recorrido-home/recorrido-home.component';
import { RecorridoService } from '../../Services/recorrido.service';
import { HeaderDashEditComponent } from "../../Componentes/Admin/header-dash-edit/header-dash-edit.component";
import { IBoleto } from '../../types/Boletos';
import { BoletosService } from '../../Services/boletos.service';

@Component({
  selector: 'app-create-boleto',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderDashEditComponent],
  templateUrl: './create-boleto.component.html',
  styleUrl: './create-boleto.component.scss'
})
export class CreateBoletoComponent {

  constructor(private boletosService: BoletosService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.boletoForm = this.fb.group({
      titulo: ['', Validators.required],
      precio: [0, Validators.required],
      imagen: [null, Validators.required],
      descripcion: ['', Validators.required],
      descripcion_card: ['', Validators.required],
      advertencias: ['', Validators.required],
    });
  }


  boleto: IBoleto = {
    advertencias:"",
    descripcion:"",
    descripcion_card:"nimodo",
    estado:1,
    imagen:"",
    precio:0,
    titulo:"",
  }

  boletoForm!: FormGroup 

  onFileSelected(event: Event, input: string, property: keyof IBoleto): void {
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

  agregarBoleto(event: Event) {
    event.preventDefault();

    console.log(this.boleto);

    this.boletosService.agregarBoleto(this.boleto).subscribe({
      next: () => {
        alert('✅ Boleto agregado correctamente.');      },
      error: (err) => {
        alert(
          '❌ Error al editar el boleto: ' +
            (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });

  }
}
