import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'})
  ],
  declarations: []
})
export class AppRoutingModule { }
