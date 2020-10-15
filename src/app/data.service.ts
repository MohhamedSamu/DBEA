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
import { alumno, asistencia, nota, usuario } from './models/models';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private eventRegError = new BehaviorSubject<string>('');
  eventRegError$ = this.eventRegError.asObservable();
  newMaestro: any;

  alumnosCollection: AngularFirestoreCollection<alumno>;
  alumnos: Observable<alumno[]>;
  alumnoDoc: AngularFirestoreDocument<alumno>;

  notasCollection: AngularFirestoreCollection<nota>;
  notas: Observable<nota[]>;

  asistenciaCollection: AngularFirestoreCollection<asistencia>;
  asistencias: Observable<asistencia[]>;
  asistenciaDoc: AngularFirestoreDocument<asistencia>;

  usersCollection: AngularFirestoreCollection<usuario>;
  users: Observable<usuario[]>;
  userDoc: AngularFirestoreDocument<usuario>;
  
  public userData: Observable<firebase.User>;
  constructor(
    public afs: AngularFirestore,
    private afsAuth: AngularFireAuth,
    private router: Router
  ) {
    this.alumnosCollection = this.afs.collection('Alumnos', (ref) =>
      ref.orderBy('apellidos', 'asc')
    );
    this.notasCollection = this.afs.collection('Notas');
    this.asistenciaCollection = this.afs.collection('Asistencias');
    this.usersCollection = this.afs.collection('Users');

    this.alumnos = this.alumnosCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as alumno;
          data.id = a.payload.doc.id;
          return data;
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

    this.users = this.afs
      .collection('Users')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((d) => {
            const datas = d.payload.doc.data() as usuario;
            datas.id = d.payload.doc.id;
            return datas;
          });
        })
      );
  } //final del constructor y obtencion de datos

  getUserState() {
    return this.afsAuth.authState;
  }

  createUser(user) {
    this.afsAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newMaestro = user;
        userCredential.user.updateProfile({
          displayName: user.fname + ' ' + user.lname,
        });
        this.insertUserData(userCredential).then(() => {
          this.router.navigate(['']);
        });
      })
      .catch((error) => {
        this.eventRegError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newMaestro.email,
      firstname: this.newMaestro.fname,
      lastname: this.newMaestro.lname,
      role: 'Maestro',
      grupo: this.newMaestro.grupo,
    });
  }

  loginByEmail(user) {
    this.afsAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredetial) => {
        if (userCredetial) {
          this.router.navigate(['']);
        }
      })
      .catch((error) => {
        this.eventRegError.next(error);
      });
  }

  logout() {
    this.afsAuth.signOut();
  }

  // GETS
  getAlumnos() {
    return this.alumnos;
  }

  getNotas() {
    return this.notas;
  }

  getAsistencias() {
    return this.asistencias;
  }

  getUsers() {
    return this.users;
  }

  // ADDS
  addAlumno(alumno: alumno) {
    this.alumnosCollection.add(alumno);
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
  // deleteNota(alumno: alumno){
  //   this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`)
  //   this.alumnoDoc.delete()
  // }
  // deleteAsistencia(alumno: alumno){
  //   this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`)
  //   this.alumnoDoc.delete()
  // }
  editarAlumno(alumno) {
    this.alumnoDoc = this.afs.doc(`Alumnos/${alumno.id}`);
    this.alumnoDoc.update(alumno);
  }
  editarAsistencia(asistencia) {
    this.asistenciaDoc = this.afs.doc(`Asistencias/${asistencia.id}`);
    this.asistenciaDoc.update(asistencia);
  }
}
