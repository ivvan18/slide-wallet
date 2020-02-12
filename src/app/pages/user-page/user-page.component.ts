import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../models/IUser';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {AuthService} from '../auth/services/auth.service';
import {ITransaction} from '../../models/ITransaction';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  isTransferLoading = false;
  formSubmitted = false;
  resultMessage = '';

  transferError = '';
  userId: number;
  transferFormGroup: FormGroup;

  user: IUser;
  userTransactions: ITransaction[];

  displayedColumns: string[] = ['id', 'amount', 'date', 'sender_id', 'receiver_id'];
  dataSource: MatTableDataSource<ITransaction>;
  userMap = { 0: 'Store'};

  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.userId = params['id'];

        forkJoin(
          this.rest.getEntityById('user', this.userId),
          this.rest.getEntities('alltransactions'),
          this.rest.getEntities('users')
        )
        .pipe(
          finalize(() => this.isLoading = false),
          takeUntil(this.destroy$)
        )
        .subscribe(data => {
          this.user = data[0].user as IUser;
          console.log('User: ', this.user);

          this.userTransactions = data[1].transactions
            .filter(transaction => {
              console.log(this.user.id);
              return transaction.receiver_id === this.user.id || transaction.sender_id === this.user.id;
            });
          console.log('User transactions: ', data[1]);
          this.dataSource = new MatTableDataSource(this.userTransactions);

          data[2].users.forEach(user => {
            this.userMap[user.id] = user.username;
          });

          this.userTransactions.forEach(transaction => {
            transaction.sender_id = this.userMap[transaction.sender_id];
            transaction.receiver_id = this.userMap[transaction.receiver_id];
          });

          this.transferFormGroup = this.formBuilder.group({
            amount: ['0', [Validators.required]]
          });

          this.transferFormGroup.valueChanges.subscribe(() => (this.formSubmitted = false));
        });
      });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTransferMoney(amount: number) {
    console.log('Transfering: ', amount);
    this.formSubmitted = true;
    this.isTransferLoading = true;
    this.transferError = '';
    this.rest.postEntity('transaction', {receiver_username: this.user.username, amount}).
      pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
          console.log('Transfer Success: ', value);
          this.isTransferLoading = false;
          this.resultMessage = value.message;
          this.openSnackBar(this.resultMessage, '');
          this.isLoading = true;
          this.ngOnInit();
          this.auth.tokenRefresh()
            .subscribe(
              () => console.log('Token successfully refreshed!'),
              () => console.log('Token refresh failed!')
            );
      }, error => {
          console.log('Transfer Error: ', error);
          this.isTransferLoading = false;
          this.transferError = error.error.message;
          this.transferFormGroup.markAsUntouched();
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
