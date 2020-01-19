import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../models/IUser';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: IUser;
  private destroy$ = new Subject();

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUser;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
