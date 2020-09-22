import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module'
import { DataService} from '../data.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public _data: DataService) { }

  ngOnInit(): void {
  }

  onLogout():void {
    this._data.logout();
  }
}
