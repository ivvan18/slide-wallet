import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from './login.component';

@Component({
  template: ''
})
export class LoginEntryComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.openDialog(), 100);
  }

  openDialog() {
    this.dialogService.open(LoginComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }
}

