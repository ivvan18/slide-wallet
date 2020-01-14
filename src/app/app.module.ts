import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';

const MAT_MODULES = [MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MAT_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
