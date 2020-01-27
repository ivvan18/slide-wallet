import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import {StoreRoutingModule} from './store-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';

const MAT_MODULES = [MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatSnackBarModule];

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    MAT_MODULES,
    StoreRoutingModule
  ]
})
export class StoreModule { }
