import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {RestorePasswordComponent} from './restore-password.component';

@Component({
  template: ''
})
export class RestorePasswordEntryComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.openDialog(), 100);
  }

  openDialog() {
    this.dialogService.open(RestorePasswordComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }

}
