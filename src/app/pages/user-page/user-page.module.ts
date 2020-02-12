import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import {UserPageRoutingModule} from './user-page-routing.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const MAT_MODULES = [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule
  ];

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    UserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserPageModule { }
