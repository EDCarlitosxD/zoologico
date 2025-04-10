import { Component, OnInit } from '@angular/core';
import { AtrasBtnComponent } from "../../Componentes/atras-btn/atras-btn.component";
import { ContadorResumenPedidoComponent } from "../../Componentes/contador-resumen-pedido/contador-resumen-pedido.component";
import { IndicadorComponent } from "../../Componentes/indicador/indicador.component";
import { Router, RouterLink } from '@angular/router';
import { AddTarjetaComponent } from "../../Componentes/modals/add-tarjeta/add-tarjeta.component";
import { MetodoDePagoComponent } from "../../Componentes/modals/metodo-de-pago/metodo-de-pago.component";
import { WarningComponent } from "../../Componentes/warning/warning.component";
import { CarritoService } from '../../Services/carrito.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IReserva, IReservaInformacion } from '../../types/Reserva';
import { TarjetaService } from '../../Service/tarjeta.service';
import { ITarjeta } from '../../types/Tarjetas';
import { FormsModule } from '@angular/forms';
import { IVenta, VentaService } from '../../Service/venta.service';
import { IVentaResponse } from '../../types/Venta';
import { IBoleto, IBoletoVenta } from '../../types/Boletos';
import { ITour } from '../../types/Tour';
import { RoundPipe } from '../../Pipes/round.pipe';

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [RouterLink, AtrasBtnComponent, ContadorResumenPedidoComponent, CommonModule,IndicadorComponent, AddTarjetaComponent, MetodoDePagoComponent, WarningComponent,FormsModule, RoundPipe],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.scss'
})
export class PagarComponent implements OnInit{

  private subscriptionTour?: Subscription;
  private subscriptioBoletos? : Subscription;
  private subscriptionBoletosVenta? : Subscription;
  private subscriptionTourVenta?: Subscription;
  tarjetas: ITarjeta[] = [];
  tarjetaSeleccionada: ITarjeta|null = null;
  boletos: IBoleto[] = [];
  boletosVenta: IBoletoVenta[] = []
  tours: IReserva[] = [];
  toursInfo: IReservaInformacion[] = [];
  totalBoletos = 0;
  totalRecorridos = 0;

  constructor( private carritoService: CarritoService, private tarjetasService:TarjetaService, private ventaService: VentaService, private router: Router){}

  ngOnInit(){
    this.tarjetasService.getTarjetas().subscribe(data => this.tarjetas = data);
    console.log(this.carritoService.tours);
    this.subscriptionTour = this.carritoService.toursInfo$.subscribe(data => {
      this.toursInfo = data;
      
      // Calculate original total
      this.totalRecorridosSinDescuento = this.toursInfo.reduce(
        (acumulador, siguiente) => acumulador + (siguiente.tour.precio * siguiente.reserva.cantidad!), 0
      );
      
      // Check for membership discount
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const membership = userDetails?.membership?.membershipDetails;
      
      if (membership && membership.descuento_tours && membership.descuento_tours > 0) {
        this.discountsApplied = true;
        this.membershipDiscount = membership.descuento_tours;
        
        // Calculate discount amount
        this.totalDescuento = (this.totalRecorridosSinDescuento * this.membershipDiscount) / 100;
        
        // Apply discount to total
        this.totalRecorridos = this.totalRecorridosSinDescuento - this.totalDescuento;
      } else {
        // No discount
        this.discountsApplied = false;
        this.totalRecorridos = this.totalRecorridosSinDescuento;
        this.totalDescuento = 0;
      }
    });
    this.subscriptionTourVenta = this.carritoService.tours$.subscribe(data => {
      this.tours = data

    }
    );
    this.subscriptioBoletos = this.carritoService.boletoInformacion$.subscribe(data => this.boletos = data);
    this.subscriptionBoletosVenta = this.carritoService.boletoVenta$.subscribe(data => {
      this.boletosVenta = data;
      this.totalBoletos = this.boletos.reduce((acumulador, siguiente,index) => acumulador + (siguiente.precio * this.boletosVenta[index].cantidad) ,0);
    });
  }



  eliminarTarjeta(id: number){
    const confirmacion = window.confirm("¿Estas seguro de eliminar la tarjeta?");
    if(!confirmacion) return;
    this.tarjetasService.eliminar(id).subscribe({
      next: () => {
        this.tarjetas = this.tarjetas.filter((tarjeta) => tarjeta.id !== id);
        alert('✅ Tarjeta eliminada correctamente.');
      },
      error: (err) => {
        alert(
          '❌ Error al eliminar la tarjeta: ' +
          (err.error?.message || err.message || 'Inténtalo de nuevo.')
        );
      },
    });
  }


  eliminarCarritoTour(idHorarrio: number){
    this.carritoService.eliminarCarritoReserva(idHorarrio);
  }


  onTarjetaGuardada(tarjeta: ITarjeta){
    this.tarjetas.push(tarjeta);
  }


  // Función para aplicar descuento a los tours
 // Fix the aplicarDescuentoMembresia function to properly return the modified tours
 aplicarDescuentoMembresia(tours: any[]): any[] {
  // Get user membership details
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const membership = userDetails?.membership?.membershipDetails;
  
  // If no membership or no discount, return tours unchanged
  if (!membership || !membership.descuento_tours || membership.descuento_tours <= 0) {
    return tours;
  }

  // First, check if we have valid tour data to work with
  if (!tours || tours.length === 0) {
    console.error('No tours data to apply discount to');
    return tours;
  }

  // Apply discount to each tour
  const toursWithDiscount = tours.map(tour => {
    // Get the correct original price from the tour object
    // We need to find where the actual price is stored
    console.log('Tour object before discount:', JSON.stringify(tour));
    
    // Try to get the price from different possible locations
    const precioOriginal = this.getTourPrice(tour);
    
    if (precioOriginal <= 0) {
      console.error('Could not find valid price for tour:', tour);
      return tour; // Return the tour unchanged if no valid price
    }
    
    // Calculate discounted price
    const descuentoPorcentaje = membership.descuento_tours;
    const descuento = (precioOriginal * descuentoPorcentaje) / 100;
    const precioConDescuento = precioOriginal - descuento;
    
    console.log(`Applying discount: Original price: ${precioOriginal}, Discount: ${descuentoPorcentaje}%, New price: ${precioConDescuento}`);
    
    // Return tour with updated price structure
    return {
      ...tour,
      precio: precioConDescuento, // This is the crucial field the backend uses
      precio_original: precioOriginal,
      descuentoAplicado: {
        porcentaje: descuentoPorcentaje,
        valorDescuento: descuento,
        tipoMembresia: membership.tipo_membresia
      }
    };
  });

  // Update UI-related variables
  this.discountsApplied = true;
  this.membershipDiscount = membership.descuento_tours;
  
  return toursWithDiscount;
}

// Helper method to find the price in the tour object
private getTourPrice(tour: any): number {
  // Check different possible locations for the price
  if (tour.precio && tour.precio > 0) {
    return tour.precio;
  }
  
  // Check if the tour info is available in the class's toursInfo array
  const tourInfo = this.toursInfo.find(info => info.reserva.id_horario_recorrido === tour.id_horario_recorrido);
  if (tourInfo && tourInfo.tour && tourInfo.tour.precio) {
    return tourInfo.tour.precio;
  }
  
  // Last resort - try to find the price somewhere else
  if (tour.precio_original && tour.precio_original > 0) {
    return tour.precio_original;
  }
  
  // Log the structure of the tour object for debugging
  console.log('Tour object structure:', tour);
  
  // If all else fails, check if we can find it elsewhere
  // You might need to call your service to get the price if needed
  
  return 0; // Return 0 if no price found
}
discountsApplied: boolean = false;
membershipDiscount: number = 0;
totalDescuento: number = 0;
totalRecorridosSinDescuento: number = 0;
// Modifica el método checkForMembershipDiscounts para actualizar también totalRecorridos
checkForMembershipDiscounts() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const membership = userDetails?.membership?.membershipDetails;
  
  if (membership && membership.descuento_tours && membership.descuento_tours > 0) {
    this.discountsApplied = true;
    this.membershipDiscount = membership.descuento_tours;
    
    // Calculate original totals without discount
    this.totalRecorridosSinDescuento = this.toursInfo.reduce(
      (acumulador, siguiente) => acumulador + (siguiente.tour.precio * siguiente.reserva.cantidad!), 0
    );
    
    // Calculate total discount amount
    this.totalDescuento = (this.totalRecorridosSinDescuento * this.membershipDiscount) / 100;
    
    // Apply discount to totalRecorridos
    this.totalRecorridos = this.totalRecorridosSinDescuento - this.totalDescuento;
  }
}
comprar() {
  if(!this.tarjetaSeleccionada) {
    alert("Selecciona una tarjeta");
    return;
  }
  
  const eliminarBoletosSinCantidad = this.carritoService.boletosVenta.filter(boleto => boleto.cantidad > 0);
  
  console.log('Original tours before discount:', JSON.stringify(this.carritoService.tours));
  console.log('Tours info available:', JSON.stringify(this.toursInfo));
  
  // Create a deep copy of the tours array
  const toursCopy = JSON.parse(JSON.stringify(this.carritoService.tours));
  
  // Apply membership discount to tours
  const toursConDescuento = this.aplicarDescuentoMembresia(toursCopy);
  
  console.log('Tours after discount applied:', JSON.stringify(toursConDescuento));

  const ventaObject: IVenta = {
    boletos: eliminarBoletosSinCantidad,
    recorridos: toursConDescuento
  };

  console.log("Venta con descuentos aplicados:", ventaObject);

  // Check if we have valid data before proceeding
  if (toursConDescuento.some(tour => tour.precio <= 0)) {
    alert("Error: Algunos recorridos tienen precio cero o inválido. Por favor, contacte al administrador.");
    return;
  }

  this.router.navigate(['/loading']).then(() => {
    this.ventaService.realizarVenta(ventaObject).subscribe({
      next: (data) => {
        // Navigate to success page with discount info
        this.router.navigate(['/comprar/pagar/gracias'], {
          state: { 
            venta: data as IVentaResponse, 
            tarjeta: this.tarjetaSeleccionada,
            descuentoAplicado: this.discountsApplied ? {
              porcentaje: this.membershipDiscount,
              valorDescuento: this.totalDescuento,
              tipoMembresia: JSON.parse(localStorage.getItem('userDetails') || '{}')?.membership?.membershipDetails?.tipo_membresia || 'Miembro'
            } : null
          }
        });
        this.carritoService.clearCarrito();
      },
      error: (err) => {
        console.error('Error al realizar la venta:', err);
        alert('Error al realizar la venta: ' + (err.error?.message || err.message || 'Intentelo de nuevo.'));
        this.router.navigate(['/comprar/pagar']);
      }
    });
  });
}
}  
