import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackEntryComponent} from './feedback-entry.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedbackEntryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedbackRoutingModule { }
