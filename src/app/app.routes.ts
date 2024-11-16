import { Routes } from '@angular/router';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';
import { DashboardAnimalesComponent } from './pages/dashboard-animales/dashboard-animales.component';
import { DashboardVentasComponent } from './pages/dashboard-ventas/dashboard-ventas.component';
import { DashboardRecorridoComponent } from './pages/dashboard-recorrido/dashboard-recorrido.component';


export const routes: Routes = [
    {path: 'donaciones', component: DonacionesComponent},
    // {path: '', component: HomeComponen},
    {path: 'animales', component:AnimalesComponent},
    {path: 'boletos', component:BoletosComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'dashboard/animales', component:DashboardAnimalesComponent},
    {path:'dashboard/ventas', component:DashboardVentasComponent},
    {path:'dashboard/recorridos', component:DashboardRecorridoComponent}
];

