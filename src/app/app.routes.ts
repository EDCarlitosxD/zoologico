import { Routes } from '@angular/router';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    {path: 'donaciones', component: DonacionesComponent},
    {path: 'animales', component:AnimalesComponent},
    {path: '', component:HomeComponent}
];

