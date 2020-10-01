import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// services
import { DataService } from './data.service';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdministracionDeGruposComponent } from './administracion-de-grupos/administracion-de-grupos.component';
import { IngresonotasComponent } from './ingresonotas/ingresonotas.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
//modules
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import { MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdministracionDeGruposComponent,
    IngresonotasComponent,
    AsistenciaComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatExpansionModule
  ],
  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }