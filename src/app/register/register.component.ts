import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorData: any;
  tipos_grupos: string[] = ['BAS1','BAS2','BAS3','SEN1', 'SEN2', 'SEN3', 'ADV1', 'ADV2', 'ADV3'];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.eventRegError$.subscribe(data => {
      this.errorData = data;
    })
  }

  register(frm){
    this._data.createUser(frm.value)
  }
}
