import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module'
import { DataService} from '../data.service'
import {usuario} from '../models/models'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: firebase.User;
  usuarios:usuario[];
  constructor(public _data: DataService) { }

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
  }

  onLogout():void {
    this._data.logout();
  }
}
