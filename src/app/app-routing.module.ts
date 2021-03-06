import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdministracionDeGruposComponent } from './administracion-de-grupos/administracion-de-grupos.component';
import {AsistenciaComponent } from './asistencia/asistencia.component';
import { IngresonotasComponent } from './ingresonotas/ingresonotas.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
