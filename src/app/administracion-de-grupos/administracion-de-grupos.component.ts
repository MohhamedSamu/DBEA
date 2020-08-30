import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno, grupo } from '../models/models';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-administracion-de-grupos',
  templateUrl: './administracion-de-grupos.component.html',
  styleUrls: ['./administracion-de-grupos.component.scss'],
  providers: [DataService]
})
export class AdministracionDeGruposComponent implements OnInit {

  SelectedAlumno: alumno = {
    id: ' ',
    apellidos: ' ',
    nombres:' '
  }

  SelectedGrupo: grupo = {
    grupo: ' ',
    idAlumno:' '
  }

  errorState: boolean;
  errorstate = false;
  errorMessage: string;

  alumnos: alumno[];
  grupos: grupo[];
  
  idalumno:string;
  tipos_grupos:string[] = ["SEN1","SEN2","ADV1","ADV2"]  ;

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
    if (this.idalumno){
      if (this.SelectedGrupo.idAlumno){
        this.errorState = true;
        this.errorMessage = "No puede asignar grupo a un alumno con grupo!."
      }else{
        if(this.SelectedGrupo.grupo === ""){
          this.SelectedGrupo.idAlumno = this.idalumno;
          this._data.addGrupo(this.SelectedGrupo)
          this.SelectedAlumno.id = ' '
          this.SelectedGrupo.id = ' '
          this.SelectedGrupo.grupo = ' '
          this.errorState = false;
        }else{
          this.errorState = true
          this.errorMessage = "No puede dejar el espacio del grupo en blanco!."
        }
      }
    }else{
      this.errorState = true
      this.errorMessage = "Debe seleccionar un alumno para asignar!."
    }    
  }

  Seleccion(id:string){
    this.idalumno = id;
    this.SelectedGrupo.idAlumno = ""
    console.log(this.SelectedGrupo.idAlumno);
  }
}
