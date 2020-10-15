import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, nota } from '../models/models';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import {usuario} from '../models/models'
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingresonotas',
  templateUrl: './ingresonotas.component.html',
  styleUrls: ['./ingresonotas.component.scss'],
  providers: [DataService],
})
export class IngresonotasComponent implements OnInit {
  SelectedAlumno: alumno = {
    id: '',
    apellidos: '',
    nombres: '',
    grupo: '',
  };
  Selectednota: nota = {
    nota: 0,
    evaluacion: '',
    idAlumno: '',
  };

  user: firebase.User;
  usuarios:usuario[];
  maestroActual:usuario;
  errorState: boolean;
  errorstate = false;
  errorMessage: string;
  alumnos: alumno[];
  index: number = 0;
  alumnoActual: string;
  idalumno: string;
  alumnoEditar: alumno;
  tipos_grupos: string[] = ['BAS1','BAS2','BAS3','SEN1', 'SEN2', 'SEN3', 'ADV1', 'ADV2', 'ADV3'];
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this._data.getAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
    this._data.getUserState().subscribe(user => {
      this.user = user;
    })
    this._data.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
    })
  }
  esAdmin(){
    for (let x = 0; x < this.usuarios.length; x++){
      if (this.usuarios[x].id === this.user.uid){
        if  (this.usuarios[x].role == 'admin'){
          return true;
        }
        this.maestroActual = this.usuarios[x]
      }
    }
    this.SelectedAlumno.grupo = this.maestroActual.grupo
    return false;
  }
  ingresoNotas(id) {
    this.Selectednota.idAlumno = id;
    this._data.addNotas(this.Selectednota)
    this.Selectednota.nota = 0;
    this.siguienteAlumno();
  }
  seleccionAlumno(id) {
    for (let x = 0; x < this.alumnos.length; x -= -1) {
      if (id === this.alumnos[x].id) {
        this.index = x;
      }
    }
    this.alumnoActual = id;
  }
  siguienteAlumno() {
    let flag = true;
    do {
      this.index -= -1;
      if (this.index >= this.alumnos.length) {
        this.index -= -1;
        this.alumnoActual = '';
        flag = false;
      } else {
        if (this.alumnos[this.index].grupo == this.SelectedAlumno.grupo) {
          this.alumnoActual = this.alumnos[this.index].id;
          flag = false;
        }
      }
    } while (flag);
  }
  SelccionAlumno(id: string) {
    this.idalumno = id;
  }
}
