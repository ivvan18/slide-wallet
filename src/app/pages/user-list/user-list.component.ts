import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {finalize} from 'rxjs/operators';
import {IUser} from '../../models/IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoading = true;
  users: IUser[] = [];
  displayedColumns: string[] = ['id', 'username', 'email'];
  dataSource: MatTableDataSource<IUser>;

  constructor(private router: Router, private rest: RestService) { }

  ngOnInit() {
    this.rest.getEntities('users')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => {
      console.log('Users: ', data);
      this.users = data.users;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUserClicked(userId: string) {
    this.router.navigate([`main/users/${userId}`]);
  }
}
