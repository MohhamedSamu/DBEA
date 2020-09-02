import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { alumno, grupo, asistencia } from '../models/models'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { constructor } from 'firebase';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  providers: [DataService]
})
export class AsistenciaComponent implements OnInit {

  SelectedAlumno: alumno = {
    id: '',
    apellidos: '',
    nombres : ''
  }
    SelectedGrupo: grupo = {
      grupo: ' ',
      idAlumno:' '
    }
    SelectedAsistencia: asistencia ={
        idAlumno:' ',
        llego : false
    }
    errorMessage: string;
    errorState:boolean;
    errorstate =false;
    alumnos: alumno[];
    grupos: grupo[];
    asistencias:asistencia[];
    idalumno:string;
    llego:boolean;
    tipos_grupos:string[] = ["SEN1","SEN2","ADV1","ADV2"]  ;
  constructor(private router: Router,private _data: DataService) { 
  }
  ngOnInit(): void {
    this._data.getAlumnos().subscribe(alumnos => {
      // console.log(alumnos);
      this.alumnos = alumnos
    })
    this._data.getGrupos().subscribe(grupos =>{
      this.grupos = grupos;
    })
    this._data.getAsistencias().subscribe(asistencias =>{
      this.asistencias = asistencias;
    })
  }

    onSubmit(): void{
        if(this.idalumno){
          if(this.SelectedGrupo.idAlumno){
            this.SelectedAsistencia.idAlumno = this.idalumno;
            this._data.addAsistencia(this.SelectedAsistencia);
            this.SelectedAsistencia.llego = true;
            this._data.addAsistencia(this.SelectedAsistencia); 
            this.errorState = false;
          }else{
            this.errorState = true;
            this.errorMessage = "No se encontro el grupo";
          }
        }else{
            this.errorState=true;
            this.errorMessage = "No se encontro el alumno";

        }
    }
    Seleccion(id:string){
      this.idalumno = id;
      this.SelectedAsistencia.idAlumno = ""
      console.log(this.SelectedAsistencia.idAlumno);
    }
    Seleccion2(asistio:boolean){
      this.llego = asistio;
      this.SelectedAsistencia.llego = true;
      console.log(this.SelectedAsistencia.llego);

    }
    
}

  


