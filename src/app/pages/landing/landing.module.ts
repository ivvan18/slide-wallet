import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {MatButtonModule, MatDividerModule, MatGridListModule, MatIconModule} from '@angular/material';
import {LandingRoutingModule} from './landing-routing.module';

const MAT_MODULES = [MatIconModule, MatGridListModule, MatDividerModule, MatButtonModule];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MAT_MODULES
  ]
})
export class LandingModule { }
