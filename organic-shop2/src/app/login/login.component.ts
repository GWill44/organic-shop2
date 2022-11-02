import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

}
