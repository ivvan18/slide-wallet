import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StoreItemEditEntryComponent} from './store-item-edit-entry.component';

const routes: Routes = [
  {
    path: '',
    component: StoreItemEditEntryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class StoreItemEditRoutingModule { }
