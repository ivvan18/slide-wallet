import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from './register.component';

@Component({
  template: ''
})
export class RegisterEntryComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.openDialog(), 100);
  }

  openDialog() {
    this.dialogService.open(RegisterComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }

}
