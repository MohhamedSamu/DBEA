import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, grupo, nota } from '../models/models';
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
    id: ' ',
    apellidos: ' ',
    nombres: ' ',
  };
  SelectedGrupo: grupo = {
    grupo: ' ',
    idAlumno: ' ',
  };
  Selectednota: nota = {
    nota: 0,
    evaluacion: ' ',
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
  constructor(private _data: DataService) { }

  ngOnInit(): void
  {
    this._data.getAlumnos().subscribe((alumnos) =>
    {
      this.alumnos = alumnos;
    });

    this._data.getGrupos().subscribe((grupos) =>
    {
      this.grupos = grupos;
    });
  }
  ingresoNotas(id){
    console.log("el id " + id + " obtuvo " );
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
  seleccionGrupo(){
    this.grupoActual = this.SelectedGrupo.grupo
    this.grupoState = true
  }
  SelccionAlumno(id:string){
    this.idalumno = id
  }
}