import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import {UserListRoutingModule} from './user-list-routing.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const MAT_MODULES = [MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSortModule, MatButtonModule];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    UserListRoutingModule
  ]
})
export class UserListModule { }
