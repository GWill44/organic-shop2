import { Injectable } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .pipe(
        map((appUser) => {
          return appUser.isAdmin;
        })
      );
  }
}
