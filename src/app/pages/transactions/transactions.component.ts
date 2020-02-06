import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../models/IUser';
import {MatTableDataSource} from '@angular/material';
import {forkJoin, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {ITransaction} from '../../models/ITransaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  isLoading = true;
  transactions: ITransaction[] = [];
  users: IUser[] = [];
  userMap = { 0: 'Store'};
  displayedColumns: string[] = ['id', 'amount', 'date', 'sender_id', 'receiver_id'];
  dataSource: MatTableDataSource<ITransaction>;
  private destroy$ = new Subject();

  constructor(private router: Router, private rest: RestService) { }

  ngOnInit() {
    forkJoin(this.rest.getEntities('alltransactions'), this.rest.getEntities('users'))
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        console.log('Transactions: ', data);
        this.transactions = data[0].transactions;
        this.users = data[1].users;
        this.users.forEach(user => {
          this.userMap[user.id] = user.username;
        });

        this.transactions.forEach(transaction => {
          transaction.sender_id = this.userMap[transaction.sender_id];
          transaction.receiver_id = this.userMap[transaction.receiver_id];
        });

        this.dataSource = new MatTableDataSource(this.transactions);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
