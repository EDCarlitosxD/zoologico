import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/Admin/dashboard/dashboard.component";
import { AnimalesComponent } from "./pages/animales/animales.component";
import { BoletosComponent } from "./pages/boletos/boletos.component";
import { DashboardAnimalesComponent } from "./pages/dashboard-animales/dashboard-animales.component";
import { DashboardRecorridoComponent } from "./pages/dashboard-recorrido/dashboard-recorrido.component";
import { DashboardVentasComponent } from "./pages/dashboard-ventas/dashboard-ventas.component";
import { DonacionesComponent } from "./pages/donaciones/donaciones.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: 'donaciones', component: DonacionesComponent },
  // { path: '', component: HomeComponent }, // Corrige el nombre del componente si es necesario
  { path: 'animales', component: AnimalesComponent },
  { path: 'boletos', component: BoletosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/animales', component: DashboardAnimalesComponent },
  { path: 'dashboard/ventas', component: DashboardVentasComponent },
  { path: 'dashboard/recorridos', component: DashboardRecorridoComponent },
];
