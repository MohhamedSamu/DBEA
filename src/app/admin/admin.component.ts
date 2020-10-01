import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module'
import { DataService} from '../data.service'
import {usuario} from '../models/models'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: firebase.User;
  usuarios:usuario[];
  constructor(public _data: DataService, private router : Router) { }

  ngOnInit(): void {
    this._data.getUserState().subscribe(user => {
      this.user = user;
    })
    this._data.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
    })
  }

  esAdmin(){
    for (let x = 0; x < this.usuarios.length; x++){
      if (this.usuarios[x].id === this.user.uid){
        if  (this.usuarios[x].role == 'admin'){
          return true;
        }
      }
    }
    this.router.navigate(['']);
  }

}
