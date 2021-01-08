import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../user/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) { 
      afAuth.authState.subscribe(user =>(this.isLogged= user));

  }

/** LOGIN */
 onLogin(user:User){
  console.log(user.email +" está iniciando sesión");
  return new Promise((resolve, rejected)=>{
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password).then(user=>{
    resolve(user)
  
  }).catch(err=>rejected(err) )})
}

/** REGISTRO */
async onRegister(user:User){
  try{

    return await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password,
    );
  }catch(error){
    console.log('Error: ', error);
  }
}

usuario() {
  return this.afAuth.auth.currentUser.uid;
}
}