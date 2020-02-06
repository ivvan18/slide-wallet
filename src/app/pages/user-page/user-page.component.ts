import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../models/IUser';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

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
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

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

}
