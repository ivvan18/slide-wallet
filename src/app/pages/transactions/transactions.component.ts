import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IUser} from '../../models/IUser';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
  pageSize = 10;
  pageIndex = 0;
  transactionsCount: number;
  isLoading = true;
  transactions: ITransaction[] = [];
  users: IUser[] = [];
  userMap = { 0: 'Store'};
  displayedColumns: string[] = ['id', 'amount', 'date', 'sender_id', 'receiver_id'];
  dataSource: MatTableDataSource<ITransaction>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private destroy$ = new Subject();

  constructor(private router: Router, private rest: RestService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initTransactions(0);
  }

  initTransactions(pageIndex: number) {
    forkJoin(this.rest.getEntities('alltransactions', {page: pageIndex}), this.rest.getEntities('users'))
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        console.log('Transactions: ', data);
        this.transactionsCount = data[0]['total transactions'];
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
        this.dataSource.paginator = this.paginator;
      });
  }

  onPageChange(params: any) {
    this.isLoading = true;
    this.pageIndex = params.pageIndex;
    this.initTransactions(this.pageIndex);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
