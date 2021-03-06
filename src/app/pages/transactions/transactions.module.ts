import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import {TransactionsRoutingModule} from './transactions-routing.module';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';

const MAT_MODULES = [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    MAT_MODULES,
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
