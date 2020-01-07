import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginEntryComponent } from './login/login-entry.component';
import { RegisterEntryComponent } from './register/register-entry.component';
import {RestorePasswordEntryComponent} from './restore-password/restore-password-entry.component';
import { ChangePasswordEntryComponent } from './change-password/change-password-entry.component';

const MAT_MODULES = [
  MatDialogModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatGridListModule
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MAT_MODULES,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent, LoginComponent, ChangePasswordComponent, RestorePasswordComponent, AuthComponent,
    LoginEntryComponent, RegisterEntryComponent, RestorePasswordEntryComponent, ChangePasswordEntryComponent],
  entryComponents: [LoginComponent, RegisterComponent, RestorePasswordComponent, ChangePasswordComponent]
})
export class AuthModule { }
