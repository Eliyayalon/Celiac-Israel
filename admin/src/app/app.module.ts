import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from "angularfire2";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from "angularfire2/firestore"
import { AngularFireAuthModule } from "angularfire2/auth"
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddEditScreenComponent } from './add-edit-screen/add-edit-screen.component';
import { LoginComponent } from './login/login.component'

//login import:
import { AuthService } from './auth.service';
//import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    AddEditScreenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule, 
    ReactiveFormsModule

  ],
  providers: [AuthService],//maybe also:  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
