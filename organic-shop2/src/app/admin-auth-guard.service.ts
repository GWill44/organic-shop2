import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(
        switchMap((user) => this.userService.get(user!.uid)))
      .pipe(
        map((appUser) => {
          return appUser.isAdmin;
        })
      );
  }
}
