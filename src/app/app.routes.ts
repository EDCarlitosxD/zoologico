import { Routes } from '@angular/router';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';


export const routes: Routes = [
    {path: 'donaciones', component: DonacionesComponent},
    // {path: '', component: HomeComponen},
    {path: 'animales', component:AnimalesComponent},
    {path: 'boletos', component:BoletosComponent},
    {path:'dashboard', component:DashboardComponent}
];

