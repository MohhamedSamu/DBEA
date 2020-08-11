import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, grupo, nota } from '../models/models';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-ingresonotas',
  templateUrl: './ingresonotas.component.html',
  styleUrls: ['./ingresonotas.component.scss'],
  providers: [DataService]
})
export class IngresonotasComponent implements OnInit {
  SelectedAlumno: alumno = {
    id: ' ',
    apellidos: ' ',
    nombres:' '
  }
  SelectedGrupo: grupo = {
    grupo: ' ',
    idAlumno:' '
  }
  Selectednota: nota = {
    nota:0,
    idAlumno:' ',
    idgrupo:' '
  }
  errorState: boolean;
  errorstate = false;
  errorMessage: string;
  alumnos: alumno[];
  grupos: grupo[];
  constructor (private _data: DataService) { }

  ngOnInit(): void {    

    this._data.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;     
    })
    
    this._data.getGrupos().subscribe(grupos => {
      this.grupos = grupos;     
    })
  }

  onSubmit(): void{
    
  }

  Seleccion(id:string){

  }

}
