import { NgModule } from '@angular/core';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent}
    ])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    NavbarComponent
  ]

})
export class CoreModule { }
