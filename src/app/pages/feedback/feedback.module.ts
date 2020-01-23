import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackEntryComponent } from './feedback-entry.component';
import {FeedbackRoutingModule} from './feedback-routing.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const MAT_MODULES = [
  MatDialogModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  declarations: [FeedbackEntryComponent, FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    MAT_MODULES,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [FeedbackComponent]
})
export class FeedbackModule { }
