import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, nota } from '../models/models';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-ingresonotas',
  templateUrl: './ingresonotas.component.html',
  styleUrls: ['./ingresonotas.component.scss'],
  providers: [DataService],
})
export class IngresonotasComponent implements OnInit
{
  SelectedAlumno: alumno = {
    id: '',
    apellidos: '',
    nombres: '',
    grupo:''
  };
  Selectednota: nota = {
    nota: 0,
    evaluacion: '',
    idAlumno: '',
  };
  errorState: boolean;
  errorstate = false;
  errorMessage: string;
  alumnos: alumno[];
  index:number = 0;
  alumnoActual:string;
  idalumno: string;
  tipos_grupos: string[] = ['SEN1', 'SEN2', 'ADV1', 'ADV2'];
  alumnoEditar: alumno
  constructor(private _data: DataService) { }

  ngOnInit(): void
  {
    this._data.getAlumnos().subscribe((alumnos) =>
    {
      this.alumnos = alumnos;
    });

  }
  ingresoNotas(id){
    this.Selectednota.idAlumno = id
    console.log("el id " + id + " obtuvo " + this.Selectednota.nota);
    this.Selectednota.nota = 0;
    this.siguienteAlumno(id)
  }
  seleccionAlumno(id){
    for (let x = 0; x < this.alumnos.length; x -=-1){
      if (id === this.alumnos[x].id){
        this.index = x
      }
    }
    this.alumnoActual = id
  }
  siguienteAlumno(id){
    if (this.index == this.alumnos.length){
      this.index -=-1;
      this.alumnoActual = ''
    }else{
      let flag = true;
      do{
        this.index -=-1;
        if (this.alumnos[this.index].grupo == this.SelectedAlumno.grupo){
          this.alumnoActual = this.alumnos[this.index].id;
          flag = false
        }
      }while (flag)
    }
  }
  onSubmit(): void
  {
    console.log(this.Selectednota.idAlumno);
    
    if (this.Selectednota.evaluacion != "")
    {
      this.errorState = false
      if (this.idalumno != " ")
      {
        this.errorstate = false
        if (this.Selectednota.nota != 0) {
          if (this.Selectednota.nota > -1 && this.Selectednota.nota < 11) {
            this.errorState = false
            this.Selectednota.idAlumno = this.idalumno
            this._data.addNotas(this.Selectednota)
            this.SelectedAlumno.id = "";
            this.Selectednota.evaluacion = ""
            this.Selectednota.idAlumno = ""
            this.Selectednota.nota = null
          } else {
            this.errorState = true
            this.errorMessage = "Nota debe estar en rango de 0 - 10"
          }
        } else {
          this.errorState = true
          this.errorMessage = "Nota no ingresadas"
        }
      } else{
        this.errorState = true
        this.errorMessage = "Alumno no ingresado"
      }
    } else {
      this.errorState = true
      this.errorMessage = "Evaluacion no ingresada"
    }
  }
  SelccionAlumno(id:string){
    this.idalumno = id
  }
}