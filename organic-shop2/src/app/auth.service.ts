import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "@angular/fire/auth";
import firebase from "firebase/compat";
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppUser} from "./models/app-user";
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    void this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout(){
    void this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      }));
  }
}
