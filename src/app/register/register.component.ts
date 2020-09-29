import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit(): void {
  }

  register(frm){
    this._data.createUser(frm.value)
  }
}
