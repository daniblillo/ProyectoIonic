import { Injectable } from '@angular/core';
import{ AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { map } from "rxjs/operators";
import { PeliculasInterfaz } from '../../models/peliculas.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage}  from '../login/login.page';
export interface pelis {
  id?:string,
  Titulo:string,
  Genero:string,
  Duracion:string,
  Director:string,
  Descripcion:string,
  Calificacion:string,
  img:string
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

    auth:AuthService;
  private pelisCollection: AngularFirestoreCollection<PeliculasInterfaz>;
  private pelis: Observable<PeliculasInterfaz[]>;
  private pelisFavCollection: AngularFirestoreCollection<PeliculasInterfaz>;
  private pelisfav: Observable<PeliculasInterfaz[]>;
  private pelisUserCollection: AngularFirestoreCollection<PeliculasInterfaz>;
  private pelisuser: Observable<PeliculasInterfaz[]>;

  constructor(private db:AngularFirestore, private afAuth: AngularFireAuth, l:AuthService) {
  
    this.pelisCollection = db.collection<PeliculasInterfaz>('peliculas');
    this.pelis = this.pelisCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
console.log("UID " + afAuth.auth.currentUser.uid)
    this.pelisFavCollection = db.collection('favoritos').doc(afAuth.auth.currentUser.uid).collection<PeliculasInterfaz>('peliculas');
    this.pelisfav = this.pelisFavCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

 conexionuid(){

  console.log("UID " + this.afAuth.auth.currentUser.uid)
  this.pelisFavCollection = this.db.collection('favoritos').doc(this.afAuth.auth.currentUser.uid).collection<PeliculasInterfaz>('peliculas');
  this.pelisfav = this.pelisFavCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 }

  getpeliculasRooms(){
    return  this.db.collection('peliculas').snapshotChanges().pipe(map(rooms=>{
      return rooms.map(a=>{
        const data =a.payload.doc.data() as pelis;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    }))
  }

  getFavoritos(){
    this.conexionuid();
    console.log("UID " + this.afAuth.auth.currentUser.uid)
    return this.pelisfav;
  }

  getFavorito(id:string){
    this.conexionuid();
    return this.pelisFavCollection.doc<PeliculasInterfaz>(id).valueChanges();
  }

  AddFavPelicula(peli:PeliculasInterfaz, id: string){
    console.log(id);
  return this.pelisFavCollection.doc<PeliculasInterfaz>(id).set(peli);
  }
  
  getPeli(id:string){
    return this.pelisCollection.doc<PeliculasInterfaz>(id).valueChanges;
  }

  updatePelicula(peli:PeliculasInterfaz, id: string){
    console.log(id);
  return this.db.collection('peliculas').doc(id).update(peli);
  }

 addPelicula(peli:PeliculasInterfaz){
   console.log(peli);
  return this.db.collection('peliculas').add(peli);
 }

 remove(id:string){
   console.log(id);
  return this.pelisCollection.doc(id).delete();
 }

 removefav(id:string){
    console.log(id);
  return this.pelisFavCollection.doc(id).delete();
  }

 getTodo(id: string){
  return this.pelisCollection.doc<PeliculasInterfaz>(id).valueChanges();
  }
}