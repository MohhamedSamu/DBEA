import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { alumno , grupo } from '../models/models';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  SelectedAlumno: alumno = {
    id: ' ',
    apellidos: ' ',
    nombres:' ',
    grupo: ' '
  }
  SelectedGrupo: grupo = {
    grupo: ' ',
    idAlumno:' '
  }
  tipos_grupos: string[] = ['SEN1', 'SEN2', 'ADV1', 'ADV2'];

  grupoActual: string
  grupoState: boolean = false
  alumnoEditar: alumno
  editState: boolean = false
  alumnos: alumno[];
  grupos: grupo[];
  grupo:string;
  constructor(private route: ActivatedRoute, private router: Router,private _data: DataService) { 
  }

  ngOnInit(): void {
    this._data.getAlumnos().subscribe(alumno => {
      // console.log(alumnos);
      this.alumnos = alumno
    })
    this._data.getGrupos().subscribe(grupo => {
      // console.log(alumnos);
      this.grupos = grupo
    })
  }

  sendMeHome(){
    this.router.navigate(['']);
  }

  SeleccionGrupo(){
    this.grupo = this.SelectedGrupo.grupo
  }

  
  deleteAlumno(alumno:alumno){
    this,this.clearState()
    this._data.deleteAlumno(alumno)
  }

  editar(alumno:alumno){
    this.editState=true;
    this.alumnoEditar = alumno;
  }

  clearState(){
    this.editState=false;
    this.alumnoEditar = null;
  }

  editarAlumno(alumno:alumno){
    this._data.editarAlumno(alumno);
    this.clearState()
  }

  seleccionGrupo(){
    this.grupoActual = this.SelectedGrupo.grupo
    this.grupoState = true
  }
}
