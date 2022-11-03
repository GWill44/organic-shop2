import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "@angular/fire/auth";
import firebase from "firebase/compat";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    void this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  logout(){
    void this.afAuth.signOut();
  }

}
