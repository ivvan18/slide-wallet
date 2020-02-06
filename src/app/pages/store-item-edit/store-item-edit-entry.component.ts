import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StoreItemEditComponent} from './store-item-edit.component';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  template: ''
})
export class StoreItemEditEntryComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(private dialogService: MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        setTimeout(() => this.openDialog(params), 100);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(params: any) {
    this.dialogService.open(StoreItemEditComponent, {
      width: '416px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: params
    });
  }
}
