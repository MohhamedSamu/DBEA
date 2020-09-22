import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from '../data.service'
import { usuario } from '../models/models'
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _data: DataService) { }

loginForm = new FormGroup({
  email: new FormControl('' , Validators.required),
  password: new FormControl('', Validators.required)
})

  ngOnInit(): void {}
  
  onLogin(form: usuario){
    this._data.loginByEmail(form);
  }
  
}
