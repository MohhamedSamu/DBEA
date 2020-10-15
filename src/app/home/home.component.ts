import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { alumno } from '../models/models'
import {usuario} from '../models/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alumno: alumno = {
    id: '',
    apellidos: '',
    nombres:'',
    grupo: null,
  }
  alumnoEditar: alumno
  editState: boolean = false
  alumnos: alumno[];
  user: firebase.User;
  usuarios:usuario[];
  constructor(private _data: DataService, private router : Router) { }

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

  onSubmit(){
    if (this.alumno.nombres != '' && this.alumno.apellidos != '' ){
      this._data.addAlumno(this.alumno);
      this.alumno.apellidos = '';
      this.alumno.nombres = '';
    }
  }
  esAdmin(){
    for (let x = 0; x < this.usuarios.length; x++){
      if (this.usuarios[x].id === this.user.uid){
        if  (this.usuarios[x].role == 'admin'){
          return true;
        }
      }
    }
    this.router.navigate(['/notas']);
  }
}
