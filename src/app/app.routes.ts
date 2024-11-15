import { Routes } from '@angular/router';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { BoletosComponent } from './pages/boletos/boletos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {path: 'donaciones', component: DonacionesComponent}, 
    {path: '', component: HomeComponent},
    {path: 'animales', component:AnimalesComponent},
    {path: 'boletos', component:BoletosComponent},
    {path: 'login', component: LoginComponent},
];

