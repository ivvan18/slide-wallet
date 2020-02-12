import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {IStoreItem} from '../../models/IStoreItem';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {IUser} from '../../models/IUser';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {
  isLoading = true;
  storeItems: IStoreItem[] = [];
  loadingPurchaseId: string;
  user: IUser;
  resultMessage = '';
  private destroy$ = new Subject();

  constructor(private rest: RestService,
              private snackBar: MatSnackBar,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;

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
          this.auth.tokenRefresh()
            .subscribe(
              () => console.log('Token successfully refreshed!'),
              () => console.log('Token refresh failed!')
            );
        },
        error => {
          console.log('Error purchase: ', error);
          this.resultMessage = error.error.message;
        });
  }

  onDeleteItemClicked(itemId: string) {
    this.rest.deleteEntity('deleteitem', {id: itemId})
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        response => {
          console.log('Success delete: ', response);
          this.isLoading = true;
          this.ngOnInit();
        },
        error => {
          console.log('Error delete: ', error);
          this.resultMessage = error.error.message;
        });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
