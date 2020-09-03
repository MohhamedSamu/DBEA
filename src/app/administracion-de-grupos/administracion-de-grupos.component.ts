import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, grupo } from '../models/models';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-administracion-de-grupos',
  templateUrl: './administracion-de-grupos.component.html',
  styleUrls: ['./administracion-de-grupos.component.scss'],
  providers: [DataService],
})
export class AdministracionDeGruposComponent implements OnInit {
  SelectedAlumno: alumno = {
    id: ' ',
    apellidos: ' ',
    nombres: ' ',
    grupo: null,
  };
  SelectedGrupo: grupo = {
    id: ' ',
    grupo: ' ',
    idAlumno: ' ',
  };

  errorState: boolean;
  errorstate = false;
  errorMessage: string;

  alumnos: alumno[];
  grupos: grupo[];

  idalumno: string;
  tipos_grupos: string[] = ['SEN1', 'SEN2', 'ADV1', 'ADV2'];

  grupoState: boolean = false
  alumnoEditar: alumno
  editState: boolean = false
  grupoActual: string

  constructor(private _data: DataService) {}
  ngOnInit(): void {
    this._data.getAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });

    this._data.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  onSubmit(): void {
    if (this.idalumno) {
      if (this.SelectedAlumno.grupo === '') {
        this.SelectedAlumno.id = this.idalumno;
        this._data.addGrupo(this.SelectedAlumno);
        this.idalumno = '';
        this.SelectedAlumno.id = ' ';
        this.SelectedAlumno.id = ' ';
        this.SelectedAlumno.grupo = ' ';
        this.errorState = false;
      } else {
        this.errorState = true;
        this.errorMessage = 'No puede dejar el espacio del grupo en blanco!.';
      }
    } else {
      this.errorState = true;
      this.errorMessage = 'Debes seleccionar un alumno!.';
    }
  }

  Seleccion(id: string) {
    this.idalumno = id;
  }

  seleccionGrupo(){
    this.grupoActual = this.SelectedGrupo.grupo
    this.grupoState = true
  }

  editar(alumno:alumno){
    this.editState=true;
    this.alumnoEditar = alumno;
  }

  clearState(){
    this.editState=false;
    this.alumnoEditar = null;
  }

  editarAlumno(grupo:string , alumno:alumno){
    alumno.grupo = grupo
    this.SelectedGrupo.id = alumno.id;
    this.SelectedGrupo.id = grupo;
    this._data.addGrupo(this.SelectedGrupo);
    this._data.editarAlumno(alumno);
    this.clearState()
  }
}
