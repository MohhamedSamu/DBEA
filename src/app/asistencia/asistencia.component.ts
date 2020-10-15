import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, asistencia } from '../models/models';
import { usuario } from '../models/models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { constructor } from 'firebase';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  providers: [DataService],
})
export class AsistenciaComponent implements OnInit {
  SelectedAlumno: alumno = {
    id: '',
    apellidos: '',
    nombres: '',
    grupo: 'SEN1',
  };
  SelectedAsistencia: asistencia = {
    idAlumno: ' ',
    llego: false,
  };
  user: firebase.User;
  usuarios: usuario[];
  maestroActual: usuario;
  errorMessage: string;
  errorState: boolean;
  errorstate = false;
  alumnos: alumno[];
  asistencias: asistencia[];
  idalumno: string;
  llego: boolean;
  tipos_grupos: string[] = [
    'BAS1',
    'BAS2',
    'BAS3',
    'SEN1',
    'SEN2',
    'SEN3',
    'ADV1',
    'ADV2',
    'ADV3',
  ];
  fecha: Date = new Date();
  grupoState: boolean = false;
  fechaHoy: string;
  banderaAsistencia: boolean = true;
  grupoActual: string;
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.fechaHoy =
      this.fecha.getDate() +
      ', ' +
      (this.fecha.getMonth() + 1) +
      ', ' +
      this.fecha.getFullYear();
    this._data.getAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
    this._data.getAsistencias().subscribe((asistencias) => {
      this.asistencias = asistencias;
    });
    this._data.getUserState().subscribe((user) => {
      this.user = user;
    });
    this._data.getUsers().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  esAdmin() {
    for (let x = 0; x < this.usuarios.length; x++) {
      if (this.usuarios[x].id === this.user.uid) {
        if (this.usuarios[x].role == 'admin') {
          return true;
        }
        this.maestroActual = this.usuarios[x];
      }
    }
    this.SelectedAlumno.grupo = this.maestroActual.grupo;
    for (let y = 0; y > this.alumnos.length; y++) {
      this.registrarAsistenciaSi(this.alumnos[y].id);
      console.log("que chingas si paso wey")
    }
    return false;
  }
  registrarAsistenciaSi(id) {
    if (this.asistencias.length === 0) {
      this.SelectedAsistencia.idAlumno = id;
      this.SelectedAsistencia.fecha = this.fechaHoy;
      this.SelectedAsistencia.llego = true;
      this._data.addAsistencias(this.SelectedAsistencia);
    } else {
      for (let x = 0; x < this.asistencias.length; x -= -1) {
        if (
          this.asistencias[x].fecha == this.fechaHoy &&
          this.asistencias[x].idAlumno == id
        ) {
          this.SelectedAsistencia.idAlumno = id;
          this.SelectedAsistencia.fecha = this.fechaHoy;
          this.SelectedAsistencia.llego = true;
          this.SelectedAsistencia.id = this.asistencias[x].id;
          this._data.editarAsistencia(this.SelectedAsistencia);
          this.banderaAsistencia = false;
        }
      }
      if (this.banderaAsistencia) {
        this.SelectedAsistencia.idAlumno = id;
        this.SelectedAsistencia.fecha = this.fechaHoy;
        this.SelectedAsistencia.llego = true;
        this._data.addAsistencias(this.SelectedAsistencia);
      }
      this.banderaAsistencia = true;
    }
  }

  registrarAsistenciaNo(id) {
    if (this.asistencias.length === 0) {
      this.SelectedAsistencia.idAlumno = id;
      this.SelectedAsistencia.fecha = this.fechaHoy;
      this.SelectedAsistencia.llego = false;
      this._data.addAsistencias(this.SelectedAsistencia);
    } else {
      for (let x = 0; x < this.asistencias.length; x -= -1) {
        if (
          this.asistencias[x].fecha == this.fechaHoy &&
          this.asistencias[x].idAlumno == id
        ) {
          this.SelectedAsistencia.idAlumno = id;
          this.SelectedAsistencia.fecha = this.fechaHoy;
          this.SelectedAsistencia.llego = false;
          this.SelectedAsistencia.id = this.asistencias[x].id;
          this._data.editarAsistencia(this.SelectedAsistencia);
          this.banderaAsistencia = false;
        }
      }
      if (this.banderaAsistencia) {
        this.SelectedAsistencia.idAlumno = id;
        this.SelectedAsistencia.fecha = this.fechaHoy;
        this.SelectedAsistencia.llego = false;
        this._data.addAsistencias(this.SelectedAsistencia);
      }
      this.banderaAsistencia = true;
    }
  }
  seleccionGrupo() {
    this.grupoActual = this.SelectedAlumno.grupo;
    this.grupoState = true;
  }
  guardar() {
    // aki deberia cerrar la opcion de asignar asistencia
  }
}
