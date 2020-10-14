import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { alumno } from '../models/models';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit
{

  SelectedAlumno: alumno = {
    id: '',
    apellidos: '',
    nombres: '',
    grupo: 'SEN2'
  }

  tipos_grupos: string[] = ['SEN1', 'SEN2', 'ADV1', 'ADV2'];

  alumnoEditar: alumno
  editState: boolean = false
  alumnos: alumno[];
  constructor( private _data: DataService) { }

  ngOnInit(): void
  {
    this._data.getAlumnos().subscribe(alumno =>
    {
      this.alumnos = alumno
    })
  }

  deleteAlumno(alumno: alumno)
  {
    this.clearState()
    this._data.deleteAlumno(alumno)
  }

  editar(alumno: alumno)
  {
    this.editState = true;
    this.alumnoEditar = alumno;
  }

  clearState()
  {
    this.editState = false;
    this.alumnoEditar = null;
  }

  editarAlumno(alumno: alumno)
  {
    this._data.editarAlumno(alumno);
    this.clearState()
  }
  
  cambio(){
    this.clearState()
  }
}
