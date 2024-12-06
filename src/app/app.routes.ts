import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/Admin/dashboard/dashboard.component";
import { AnimalesComponent } from "./pages/animales/animales.component";
import { DashboardAnimalesComponent } from "./pages/dashboard-animales/dashboard-animales.component";
import { DashboardRecorridoComponent } from "./pages/dashboard-recorrido/dashboard-recorrido.component";
import { DashboardVentasComponent } from "./pages/dashboard-ventas/dashboard-ventas.component";
import { DonacionesComponent } from "./pages/donaciones/donaciones.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ComponentesComponent } from "./pages/componentes/componentes.component";
import { PruebaComponent } from "./Componentes/prueba/prueba.component";
import { AnimalSoloComponent } from './pages/animal-solo/animal-solo.component';
import { RecorridosComponent } from "./pages/recorridos/recorridos.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ContactoComponent } from "./pages/contacto/contacto.component";
import { EditRecorridosComponent } from "./pages/dashboard/edit-recorridos/edit-recorridos.component";
import { Component } from '@angular/core';
import { EditGuiasComponent } from "./pages/dashboard/edit-guias/edit-guias.component";
import { EditRecoVendidosComponent } from "./pages/dashboard/edit-reco-vendidos/edit-reco-vendidos.component";
import { PagarComponent } from "./pages/pagar/pagar.component";
import { CierreComponent } from "./pages/cierre/cierre.component";
import { LoadingComponent } from "./pages/loading/loading.component";
import { EditAnimalComponent } from "./pages/dashboard/edit-animal/edit-animal.component";
import { CreateAnimalesComponent } from "./pages/create-animales/create-animales.component";
import { PagarDonacionComponent } from "./pages/pagar-donacion/pagar-donacion.component";
import { CierreDonacionComponent } from "./pages/cierre-donacion/cierre-donacion.component";
import { DashboardReportesComponent } from "./pages/dashboard-reportes/dashboard-reportes.component";
import { AddGuiaComponent } from "./pages/dashboard/add-guia/add-guia.component";

export const routes: Routes = [
  { path: 'contactanos', component: ContactoComponent }, //A PIXEL✅✅✅,
  { path: 'donaciones', component: DonacionesComponent }, //A PIXEL✅✅✅,
  { path: 'animales', component: AnimalesComponent }, // Falta filtro A PIXEL✅✅✅
  { path: 'loading', component: LoadingComponent }, //Aprobado ✅✅✅
  { path: 'comprar', component: RecorridosComponent }, //A PIXEL✅✅✅, Falta calendario y selectores
  { path: 'comprar/pagar', component: PagarComponent }, //CENTRAR MODALS, MENSAJES DE CONFIRMACION, MOBILE,


  { path: '', component: HomeComponent }, // A PIXEL✅✅✅
  { path: 'login', component: LoginComponent },// Terminarlo,
  { path: 'register', component: RegisterComponent },// Terminarlo,

  { path: 'animales/animal', component: AnimalSoloComponent}, //Aprobado ✅✅✅
  

  { path: 'comprar/pagar/gracias', component: CierreComponent }, //,
  { path: 'donaciones/pagar', component: PagarDonacionComponent },
  { path: 'donaciones/pagar/gracias', component: CierreDonacionComponent },



  
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/animales', component: DashboardAnimalesComponent },
  { path: 'dashboard/ventas', component: DashboardVentasComponent },


  { path: 'dashboard/tours', component: DashboardRecorridoComponent },
  { path: 'dashboard/tours/create', component: AnimalSoloComponent },
  { path: 'dashboard/tours/edit', component: EditRecorridosComponent },
  { path: 'dashboard/tours/guias/edit', component: EditGuiasComponent },
  { path: 'dashboard/tours/guias/create', component: AddGuiaComponent },
  { path: 'dashboard/tours/vendidos/edit', component: EditRecoVendidosComponent },


  { path: 'dashboard/reportes', component: DashboardReportesComponent },


  { path: 'dashboard/animal/edit', component: EditAnimalComponent },


  { path: 'dashboard/animales/create', component: CreateAnimalesComponent },

  { path: 'pruebas', component: PruebaComponent},
];
