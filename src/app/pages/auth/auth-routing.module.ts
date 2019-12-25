import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginEntryComponent} from './login/login-entry.component';
import {RegisterEntryComponent} from './register/register-entry.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'login'},
      {
        path: 'login',
        component: LoginEntryComponent
      },
      {path: 'register', component: RegisterEntryComponent},
      {path: 'restore-password', component: RestorePasswordComponent},
      {path: 'change-password', component: ChangePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class AuthRoutingModule {}
