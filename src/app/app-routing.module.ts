import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdministracionDeGruposComponent } from './administracion-de-grupos/administracion-de-grupos.component';
import {AsistenciaComponent } from './asistencia/asistencia.component';
import { IngresonotasComponent } from './ingresonotas/ingresonotas.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component'
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
  },
  {
    path: 'nav',
    component: NavBarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
