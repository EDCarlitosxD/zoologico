import { Routes } from '@angular/router';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { HomeComponent } from './pages/home/home.component';
import { AnimalesComponent } from './pages/animales/animales.component';


export const routes: Routes = [
    {path: 'donaciones', component: DonacionesComponent}, 
    {path: '', component: HomeComponent},
    {path: 'animales', component:AnimalesComponent}
];

