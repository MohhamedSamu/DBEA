import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { DataService } from '../data.service';
import { usuario, alumno } from '../models/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: firebase.User;
  usuarios: usuario[];
  alumnos: alumno[];

  constructor(public _data: DataService, private router: Router) {}

  ngOnInit(): void {
    this._data.getUserState().subscribe((user) => {
      this.user = user;
    });
    this._data.getUsers().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    this._data.getAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }

  esAdmin() {
    for (let x = 0; x < this.usuarios.length; x++) {
      if (this.usuarios[x].id === this.user.uid) {
        if (this.usuarios[x].role == 'admin') {
          return true;
        }
      }
    }
    this.router.navigate(['']);
  }
  finalModulo() {
    for (let x = 0; x < this.alumnos.length; x -= -1) {
      switch (this.alumnos[x].grupo) {
        case 'BAS1':
          this.alumnos[x].grupo = 'ADV1';
          break;
        case 'BAS2':
          this.alumnos[x].grupo = 'ADV2';
          break;
        case 'BAS3':
          this.alumnos[x].grupo = 'ADV3';
          break;

        case 'ADV1':
          this.alumnos[x].grupo = 'SEN1';
          break;
        case 'ADV2':
          this.alumnos[x].grupo = 'SEN2';
          break;
        case 'ADV3':
          this.alumnos[x].grupo = 'SEN3';
          break;

        case 'SEN1':
          this.alumnos[x].grupo = 'GRAD';
          break;
        case 'SEN2':
          this.alumnos[x].grupo = 'GRAD';
          break;
        case 'SEN3':
          this.alumnos[x].grupo = 'GRAD';
          break;
      }
      this._data.editarAlumno(this.alumnos[x]);
    }
  }
}
