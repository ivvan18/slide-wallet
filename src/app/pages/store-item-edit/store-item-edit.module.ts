import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreItemEditComponent } from './store-item-edit.component';
import {StoreItemEditRoutingModule} from './store-item-edit-routing.module';
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
import {StoreItemEditEntryComponent} from './store-item-edit-entry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  declarations: [StoreItemEditComponent, StoreItemEditEntryComponent],
  imports: [
    CommonModule,
    StoreItemEditRoutingModule,
    MAT_MODULES,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [StoreItemEditComponent]
})
export class StoreItemEditModule { }
