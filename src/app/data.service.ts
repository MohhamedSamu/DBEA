import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { alumno, grupo, asistencia, nota } from './models/models';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  alumnosCollection: AngularFirestoreCollection<alumno>;
  alumnos: Observable<alumno[]>

  gruposCollection: AngularFirestoreCollection<grupo>;
  grupos: Observable<grupo[]>

  notasCollection: AngularFirestoreCollection<nota>;
  notas: Observable<nota[]>

  asistenciaCollection: AngularFirestoreCollection<asistencia>;
  asistencia: Observable<asistencia[]>
  constructor(public afs: AngularFirestore) { 

    this.alumnosCollection = this.afs.collection('Alumnos');
    this.gruposCollection = this.afs.collection('Grupos');
    this.notasCollection = this.afs.collection('Notas');

    this.alumnos = this.afs.collection('Alumnos').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data=  a.payload.doc.data() as alumno;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    

    this.grupos = this.afs.collection('Grupos').snapshotChanges().pipe(map(changes => {
      return changes.map(b => {
        const datas = b.payload.doc.data() as grupo;
        datas.id = b.payload.doc.id;
        return datas;
      })
    }));

    this.notas = this.afs.collection('Notas').snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        const datas = c.payload.doc.data() as nota;
        datas.id = c.payload.doc.id;
        return datas;
      })
    })); 
  }

  getAlumnos() {
    return this.alumnos;
  }
  
  getGrupos() {
    return this.grupos;
  }
  
  getNotas() {
    return this.notas;
  }
  
  getAsistencias(){
    return this.asistencia;
  }

  addAlumno(alumno: alumno) {
    this.alumnosCollection.add(alumno);
  }

  addGrupo(grupo:grupo){
    this.gruposCollection.add(grupo);
  
  }

  addNotas(nota:nota){
    this.notasCollection.add(nota);
  }

  addAsistencia(asistencia:asistencia){
    this.asistenciaCollection.add(asistencia);
  }
}
