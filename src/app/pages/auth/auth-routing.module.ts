import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth.component';
import {LoginEntryComponent} from './login/login-entry.component';
import {RegisterEntryComponent} from './register/register-entry.component';
import {RestorePasswordEntryComponent} from './restore-password/restore-password-entry.component';
import {ChangePasswordEntryComponent} from './change-password/change-password-entry.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'login'},
      {path: 'login', component: LoginEntryComponent},
      {path: 'register', component: RegisterEntryComponent},
      {path: 'restore-password', component: RestorePasswordEntryComponent},
      {path: 'change-password', component: ChangePasswordEntryComponent},
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class AuthRoutingModule {}
