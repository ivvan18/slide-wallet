import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { FeedbackComponent } from './feedback.component';

@Component({
  template: ''
})
export class FeedbackEntryComponent implements OnInit {

  constructor(private dialogService: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.openDialog(), 100);
  }

  openDialog() {
    this.dialogService.open(FeedbackComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }
}
