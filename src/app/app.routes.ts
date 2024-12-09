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
import { AddRecoComponent } from "./pages/dashboard/add-reco/add-reco.component";
import { DatosPerfilComponent } from "./pages/datos-perfil/datos-perfil.component";
import { ComprasRealizadasComponent } from "./pages/compras-realizadas/compras-realizadas.component";
import { EditBoletoComponent } from "./pages/dashboard/edit-boleto/edit-boleto.component";
import { adminGuard } from "./Guard/admin.guard";
import { isLoggedGuard } from "./is-logged.guard";
import { CreatRecorridoComponent } from "./paages/creat-recorrido/creat-recorrido.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: 'contactanos', component: ContactoComponent }, //A PIXEL✅✅✅,
  { path: 'donaciones', component: DonacionesComponent }, //A PIXEL✅✅✅,
  { path: 'animales', component: AnimalesComponent }, // Falta filtro A PIXEL✅✅✅
  { path: 'loading', component: LoadingComponent }, //Aprobado ✅✅✅
  { path: 'comprar', component: RecorridosComponent }, //A PIXEL✅✅✅, Falta calendario y selectores
  { path: 'comprar/pagar', component: PagarComponent,  canActivate: [AuthGuard]  }, //CENTRAR MODALS, MENSAJES DE CONFIRMACION, MOBILE,


  { path: '', component: HomeComponent }, // A PIXEL✅✅✅
  { path: 'login', component: LoginComponent },// Terminarlo,
  { path: 'register', component: RegisterComponent },// Terminarlo,
  { path: 'login', component: LoginComponent, canActivate: [isLoggedGuard] },// Terminarlo,
  { path: 'register', component: RegisterComponent , canActivate: [isLoggedGuard]},// Terminarlo,

  { path: 'animal/{slug}', component: AnimalSoloComponent}, //Aprobado ✅✅✅


  { path: 'comprar/pagar/gracias', component: CierreComponent }, //,
  { path: 'donaciones/pagar', component: PagarDonacionComponent, canActivate: [AuthGuard] },
  { path: 'donaciones/pagar/gracias', component: CierreDonacionComponent },

  { path: 'configuracion/perfil', component: DatosPerfilComponent },
  { path: 'configuracion/compras', component: ComprasRealizadasComponent },








  // { path: 'dashboard/animales', component: DashboardAnimalesComponent },






  // { path: 'dashboard/tours/vendidos/edit', component: EditRecoVendidosComponent },






  // { path: 'dashboard/animales/create', component: CreateAnimalesComponent },

  // { path: 'dashboard/recorridos', component: DashboardRecorridoComponent },
  // { path: 'dashboard/recorridos/edit', component: EditRecorridosComponent },


  { path: 'dashboard/animal/:slug', component: AnimalSoloComponent, canActivate: [adminGuard]}, //Mobile parcialmente terminado

  { path: 'dashboard/guias/:id', component: EditGuiasComponent , canActivate: [adminGuard]},
  { path: 'dashboard/animales/edit/:slug', component: EditAnimalComponent , canActivate: [adminGuard]},
  { path: 'dashboard/reportes', component: DashboardReportesComponent , canActivate: [adminGuard]},
  { path: 'dashboard/animales', component: DashboardAnimalesComponent , canActivate: [adminGuard]},
  { path: 'dashboard/ventas', component: DashboardVentasComponent , canActivate: [adminGuard]},
  { path: 'dashboard/recorridos', component: DashboardRecorridoComponent , canActivate: [adminGuard]},

  { path: 'dashboard/recorridos/vendidos/edit', component: EditRecoVendidosComponent , canActivate: [adminGuard]},
  { path: 'dashboard/animales/create', component: CreateAnimalesComponent , canActivate: [adminGuard]},
  { path: 'dashboard/recorridos/vendidos/edit', component: EditRecoVendidosComponent , canActivate: [adminGuard]},
  // BOLETOS
  { path: 'dashboard/boletos', component: DashboardVentasComponent , canActivate: [adminGuard]},
  { path: 'dashboard/boletos/edit/:id', component: EditBoletoComponent , canActivate: [adminGuard]},


  // TOURS
  { path: 'dashboard/tours', component: DashboardRecorridoComponent , canActivate: [adminGuard]},
  { path: 'dashboard/tours/create', component: CreatRecorridoComponent , canActivate: [adminGuard]},
  { path: 'dashboard/tours/edit', component: EditRecorridosComponent , canActivate: [adminGuard]},
  { path: 'dashboard/tours/guias/edit', component: EditGuiasComponent , canActivate: [adminGuard]},
  { path: 'dashboard/tours/guias/create', component: AddGuiaComponent , canActivate: [adminGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard],},
  { path: 'pruebas', component: PruebaComponent},
];
