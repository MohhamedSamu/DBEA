import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
