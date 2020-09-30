import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from '../data.service'
import { usuario } from '../models/models'
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorData: any;
  constructor(private _data: DataService, private route: Router){ }

loginForm = new FormGroup({
  email: new FormControl('' , Validators.required),
  password: new FormControl('', Validators.required)
})

  ngOnInit(): void {
    this._data.eventRegError$.subscribe( data => {
      this.errorData = data;
    })
  }
  
  onLogin(form: usuario){
    this._data.loginByEmail(form);
  }
}
