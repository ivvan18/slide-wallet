import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../models/IUser';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  userId: number;

  user: IUser;
  private destroy$ = new Subject();

  constructor( private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.userId = params['id'];

        this.rest.getEntityById('user', this.userId)
          .pipe(
            finalize(() => this.isLoading = false),
            takeUntil(this.destroy$)
          )
          .subscribe(data => {
            this.user = data.user as IUser;
            console.log('User: ', this.user);
          });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
