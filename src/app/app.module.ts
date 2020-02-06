import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDividerModule, MatIconModule, MatMenuModule, MatSortModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {JwtInterceptor} from './api/jwt.interceptor';

const MAT_MODULES = [MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatTableModule, MatSortModule];

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
