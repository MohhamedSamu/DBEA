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
export class AboutComponent implements OnInit {

  alumnos: alumno[];

  constructor(private route: ActivatedRoute, private router: Router,private _data: DataService) { 
  }

  ngOnInit(): void {
    this._data.getAlumnos().subscribe(alumnos => {
      // console.log(alumnos);
      this.alumnos = alumnos
    })
  }

  sendMeHome(){
    this.router.navigate(['']);
  }

}
