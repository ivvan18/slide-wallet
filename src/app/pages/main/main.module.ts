import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

const MAT_MODULES = [MatToolbarModule];

@NgModule({
  declarations: [MainComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    MainRoutingModule,
    RouterModule
  ]
})
export class MainModule { }
