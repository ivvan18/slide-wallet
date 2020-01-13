import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import {UserListRoutingModule} from './user-list-routing.module';
import {MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';

const MAT_MODULES = [MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    UserListRoutingModule
  ]
})
export class UserListModule { }
