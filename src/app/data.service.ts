import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { alumno, grupo, asistencia, nota, usuario } from './models/models';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataService {

  newMaestro: any;

  alumnosCollection: AngularFirestoreCollection<alumno>;
  alumnos: Observable<alumno[]>;
  alumnoDoc: AngularFirestoreDocument<alumno>;
  
  gruposCollection: AngularFirestoreCollection<grupo>;
  grupos: Observable<grupo[]>;
  grupoDoc: AngularFirestoreDocument<grupo>;
  
  notasCollection: AngularFirestoreCollection<nota>;
  notas: Observable<nota[]>;
  
  asistenciaCollection: AngularFirestoreCollection<asistencia>;
  asistencias: Observable<asistencia[]>;
  asistenciaDoc: AngularFirestoreDocument<asistencia>;


  public userData: Observable<firebase.User>
  constructor(public afs: AngularFirestore, private afsAuth: AngularFireAuth , private router: Router) {

    
    this.userData = this.afsAuth.authState;
    

    this.alumnosCollection = this.afs.collection('Alumnos', (ref) =>
      ref.orderBy('apellidos', 'asc')
    );
    this.gruposCollection = this.afs.collection('Grupos');
    this.notasCollection = this.afs.collection('Notas');
    this.asistenciaCollection = this.afs.collection('Asistencias');

    this.alumnos = this.alumnosCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as alumno;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    async function getDoc(id) {
      const snapshot = await this.asistenciaCollection.doc(id).get();
      return snapshot.data();
    }

    this.grupos = this.afs
      .collection('Grupos')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((b) => {
            const datas = b.payload.doc.data() as grupo;
            datas.id = b.payload.doc.id;
            return datas;
          });
        })
      );

    this.notas = this.afs
      .collection('Notas')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => {
            const datas = c.payload.doc.data() as nota;
            datas.id = c.payload.doc.id;
            return datas;
          });
        })
      );

    this.asistencias = this.afs
      .collection('Asistencias')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((d) => {
            const datas = d.payload.doc.data() as asistencia;
            datas.id = d.payload.doc.id;
           return datas;
          });
        })
      );
  }//final del constructor y obtencion de datos

  createUser(user){
    this.afsAuth.createUserWithEmailAndPassword( user.email, user.password)
    .then( userCredential => {
      this.newMaestro = user;
      userCredential.user.updateProfile( {
        displayName: user.firstname + ' ' + user.lastname
      });

    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential){

  }
  
  loginByEmail(user: usuario) {
    const { email, password } = user;
    return this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afsAuth.signOut();
  }

  // GETS
  getAlumnos() {
    return this.alumnos;
  }

  getGrupos() {
    return this.grupos;
  }

  getNotas() {
    return this.notas;
  }

  getAsistencias() {
    return this.asistencias;
  }

  // ADDS
  addAlumno(alumno: alumno) {
    this.alumnosCollection.add(alumno);
  }

  addGrupo(grupo: grupo) {
    this.gruposCollection.add(grupo);
  }

  addNotas(nota: nota) {
    this.notasCollection.add(nota);
  }

  addAsistencias(asistencia: asistencia) {
    this.asistenciaCollection.add(asistencia);
  }

  // deletes
  deleteAlumno(alumno: alumno) {
    this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`);
    this.alumnoDoc.delete();
  }
  deleteGrupo(grupo: grupo) {
    this.grupoDoc = this.afs.doc(`Grupos/${grupo.id}`);
    this.grupoDoc.delete();
  }
  // deleteNota(alumno: alumno){
  //   this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`)
  //   this.alumnoDoc.delete()
  // }
  // deleteAsistencia(alumno: alumno){
  //   this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`)
  //   this.alumnoDoc.delete()
  // }
  editarAlumno(alumno){
    this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`)
    this.alumnoDoc.update(alumno);
  }
  editarAsistencia(asistencia){
    this.asistenciaDoc = this.afs.doc(`Asistencias/${asistencia.id}`)
    this.asistenciaDoc.update(asistencia);
  }
}