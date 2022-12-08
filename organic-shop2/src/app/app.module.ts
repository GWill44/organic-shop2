import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {HomeComponent} from './core/components/home/home.component';

import {LoginComponent} from './core/components/login/login.component';


import {environment} from '../environments/environment';

import {DataTablesModule} from "angular-datatables";

import {SharedModule} from "./shared/shared.module";
import {AdminModule} from "./admin/admin.module";
import {ShoppingModule} from "./shopping/shopping.module";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    DataTablesModule
    ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
