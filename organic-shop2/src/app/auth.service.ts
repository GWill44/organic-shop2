import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@angular/fire/auth";
import firebase from "firebase/compat";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
  logout(){
    this.afAuth.signOut();
  }

}
