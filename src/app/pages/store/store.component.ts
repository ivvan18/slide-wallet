import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {IStoreItem} from '../../models/IStoreItem';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {
  isLoading = true;
  storeItems: IStoreItem[] = [];
  loadingPurchaseId: string;
  resultMessage = '';
  private destroy$ = new Subject();

  constructor(private rest: RestService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rest.getEntities('shop')
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      ).subscribe(store => {
        console.log('Store: ', store);
        this.storeItems = store.items;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuyItemClicked(itemId: string) {
    this.loadingPurchaseId = itemId;
    this.rest.postEntity('/shop/buy', {id: itemId})
      .pipe(
        finalize(() => {
          this.loadingPurchaseId = '';
          this.openSnackBar(this.resultMessage, '');
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        response => {
          console.log('Success purchase: ', response);
          this.resultMessage = response.message;
        },
        error => {
          console.log('Error purchase: ', error);
          this.resultMessage = error.error.message;
        });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
