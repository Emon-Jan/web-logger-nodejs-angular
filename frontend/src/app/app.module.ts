import { WebService } from "./web.service";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
          MatCardModule, 
          MatButtonModule, 
          MatExpansionModule, 
          MatDividerModule, 
          MatSnackBarModule,
          MatInputModule,
          MatChipsModule
        } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatChipsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
