import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {IUser} from '../../models/IUser';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  isLoading = true;
  users: IUser[] = [];
  displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'email', 'balance', 'adminAction'];
  dataSource: MatTableDataSource<IUser>;
  user: IUser;

  @ViewChild(MatSort) sort: MatSort;

  private destroy$ = new Subject();

  constructor(private router: Router, private rest: RestService, private cd: ChangeDetectorRef, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;

    this.rest.getEntities('users')
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        console.log('Users: ', data);
        this.users = data.users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.cd.markForCheck();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUserClicked(userId: string) {
    this.router.navigate([`/user/${userId}`]);
  }

  onUserDelete(event: Event, userId: number) {
    event.stopPropagation();

    this.rest.deleteEntity('deleteuser', {id: userId})
      .subscribe(
        () => {
          this.isLoading = true;
          this.users = [];
          this.ngOnInit();
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
