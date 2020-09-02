import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdministracionDeGruposComponent } from './administracion-de-grupos/administracion-de-grupos.component';
import {AsistenciaComponent } from './asistencia/asistencia.component';
import { IngresonotasComponent } from './ingresonotas/ingresonotas.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admingrupos',
    component: AdministracionDeGruposComponent
  },
  {
    path: 'notas',
    component: IngresonotasComponent
  },
  {
    path: 'asistencia',
    component: AsistenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
