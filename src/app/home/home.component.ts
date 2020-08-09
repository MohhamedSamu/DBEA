import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { alumno } from '../models/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  alumno: alumno = {
    // id: ' ',
    apellidos: ' ',
    nombres:' '
  }
  //itemCount: number ;
  constructor(private _data: DataService) { }

  ngOnInit(): void {

    // this.itemCount = this.alumnos.length;

  }

  onSubmit(){
    if (this.alumno.nombres != '' && this.alumno.apellidos != '' ){
      this._data.addAlumno(this.alumno);
      this.alumno.apellidos = '';
      this.alumno.nombres = ' ';
    }
  }

}
