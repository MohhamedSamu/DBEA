import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { alumno } from './models/alumno';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  alumnosCollection: AngularFirestoreCollection<alumno>;
  alumnos: Observable<alumno[]>
  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);
  goal = this.goals.asObservable();

  constructor(public afs: AngularFirestore) { 
    this.alumnos = this.afs.collection('Alumnos').valueChanges();
  }

  getItems() {
    return this.alumnos;
  }

  changeGoal(goal){
    this.goals.next(goal);
  }

}
