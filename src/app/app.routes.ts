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
import { EditAnimalComponent } from "./pages/edit-animal/edit-animal.component";
import { CreateAnimalesComponent } from "./pages/create-animales/create-animales.component";
import { adminGuard } from "./Guard/admin.guard";
import { isLoggedGuard } from "./is-logged.guard";
import { BoletosComponent } from "./pages/boletos/boletos.component";

export const routes: Routes = [
  { path: 'donaciones', component: DonacionesComponent }, // Corregido ✅✅✅,
  { path: '', component: HomeComponent }, // Corrige el nombre del componente si es necesario
  { path: 'animales', component: AnimalesComponent }, // Falta filtro
  { path: 'login', component: LoginComponent },// Terminarlo,
  { path: 'register', component: RegisterComponent },// Terminarlo,
  { path: 'boletos', component: BoletosComponent }, // Aprobado ✅✅✅,
  { path: 'login', component: LoginComponent, canActivate: [isLoggedGuard] },// Terminarlo,
  { path: 'register', component: RegisterComponent , canActivate: [isLoggedGuard]},// Terminarlo,

  { path: 'animales/animal', component: AnimalSoloComponent}, //Mobile parcialmente terminado
  { path: 'comprar', component: RecorridosComponent }, // Falta calendario y selectores
  { path: 'contactanos', component: ContactoComponent }, //Aprobado ✅✅✅,
  { path: 'comprar/pagar', component: PagarComponent }, //Aprobado ✅✅✅,
  { path: 'comprar/pagar/gracias', component: CierreComponent }, //Aprobado ✅✅✅,
  { path: 'loading', component: LoadingComponent },

  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'dashboard/animales', component: DashboardAnimalesComponent },
  { path: 'dashboard/ventas', component: DashboardVentasComponent },
  { path: 'dashboard/recorridos', component: DashboardRecorridoComponent },
  { path: 'dashboard/recorridos/edit', component: EditRecorridosComponent },


  { path: 'animal/:slug', component: AnimalSoloComponent}, //Mobile parcialmente terminado

  { path: 'dashboard', component: DashboardComponent,
    canActivate: [adminGuard],
    children:[
      { path: 'animales', component: DashboardAnimalesComponent },
      { path: 'ventas', component: DashboardVentasComponent },
      { path: 'recorridos', component: DashboardRecorridoComponent },
      { path: 'guias/:id', component: EditGuiasComponent },
      { path: 'animal/edit', component: EditAnimalComponent },
      { path: 'recorridos/vendidos/edit', component: EditRecoVendidosComponent },
      { path: 'animales/create', component: CreateAnimalesComponent },
      { path: 'recorridos/vendidos/edit', component: EditRecoVendidosComponent },

    ]

  },
  { path: 'pruebas', component: PruebaComponent},
];
