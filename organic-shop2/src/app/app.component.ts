import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  userSubscription: Subscription;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
   this.userSubscription = auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        void router.navigateByUrl(returnUrl!);
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
