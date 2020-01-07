import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ChangePasswordComponent} from './change-password.component';

@Component({
  template: ''
})
export class ChangePasswordEntryComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.openDialog(), 100);
  }

  openDialog() {
    this.dialogService.open(ChangePasswordComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }

}
