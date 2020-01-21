import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from './transactions.component';

export const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionsRoutingModule { }
