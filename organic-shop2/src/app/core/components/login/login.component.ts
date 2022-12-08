import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public auth: AuthService,
    private router: Router) {}

  login() {
    this.auth.login();
    this.router.navigate(['/']);
  }

}
