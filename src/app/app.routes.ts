import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/Admin/dashboard/dashboard.component";
import { AnimalesComponent } from "./pages/animales/animales.component";
import { BoletosComponent } from "./pages/boletos/boletos.component";
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
import { adminGuard } from "./Guard/admin.guard";
import { isLoggedGuard } from "./is-logged.guard";

export const routes: Routes = [
  { path: 'donaciones', component: DonacionesComponent }, // Corregido ✅✅✅,
  { path: '', component: HomeComponent }, // Corrige el nombre del componente si es necesario
  { path: 'animales', component: AnimalesComponent }, // Falta filtro
  { path: 'boletos', component: BoletosComponent }, // Aprobado ✅✅✅,
  { path: 'login', component: LoginComponent, canActivate: [isLoggedGuard] },// Terminarlo,
  { path: 'register', component: RegisterComponent , canActivate: [isLoggedGuard]},// Terminarlo,

  { path: 'animal', component: AnimalSoloComponent}, //Mobile parcialmente terminado
  { path: 'recorridos', component: RecorridosComponent }, // Falta calendario y selectores
  { path: 'contactanos', component: ContactoComponent },

  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'dashboard/animales', component: DashboardAnimalesComponent },
  { path: 'dashboard/ventas', component: DashboardVentasComponent },
  { path: 'dashboard/recorridos', component: DashboardRecorridoComponent },
  { path: 'dashboard/recorridos/edit', component: EditRecorridosComponent },
  { path: 'dashboard/recorridos/vendidos/edit', component: EditRecoVendidosComponent },

  { path: 'animal/:slug', component: AnimalSoloComponent}, //Mobile parcialmente terminado

  { path: 'dashboard', component: DashboardComponent,
    canActivate: [adminGuard],
    children:[
      { path: 'animales', component: DashboardAnimalesComponent },
      { path: 'ventas', component: DashboardVentasComponent },
      { path: 'recorridos', component: DashboardRecorridoComponent },
      { path: 'guias/:id', component: EditGuiasComponent },

    ]

  },
  { path: 'pruebas', component: PruebaComponent},
];
