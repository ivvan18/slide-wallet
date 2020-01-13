import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import {UserPageRoutingModule} from './user-page-routing.module';
import {MatProgressSpinnerModule} from '@angular/material';

const MAT_MODULES = [MatProgressSpinnerModule];

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    UserPageRoutingModule
  ]
})
export class UserPageModule { }
