import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

function checkPasswords(group: FormGroup) {
  const pass = group.controls.password.value;
  const confirmPass = group.controls.repeatPassword.value;

  return pass === confirmPass ? null : {notSame: true};
}

export class RepeatPasswordMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidRepeatPassword = !!(
      control &&
      control.parent &&
      control.parent.hasError('notSame')
    );

    return invalidRepeatPassword;
  }
}

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  error = '';
  isFetching = false;
  access_token = '';
  message = '';
  formSubmitted = false;
  hidePassword = true;
  hidePasswordRepeat = true;
  repeatPasswordMatcher = new RepeatPasswordMatcher();
  tokenToRestore = '';
  queryParam = '';

  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<RestorePasswordComponent>,
  ) { }

  ngOnInit() {
    this.emailFormGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
    );

    this.passwordFormGroup = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['']
      },
      {validator: checkPasswords}
    );

    this.emailFormGroup.valueChanges.subscribe(
      value => (this.formSubmitted = false)
    );

    this.passwordFormGroup.valueChanges.subscribe(
      value => (this.formSubmitted = false)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isEmailValid(): boolean {
    return this.emailFormGroup.get('email').valid;
  }

  isPasswordValid(): boolean {
    return this.passwordFormGroup.get('password').valid;
  }

  onForgotPasswordClicked() {
    this.formSubmitted = true;
    this.isFetching = true;

    this.auth.forgotPassword(this.emailFormGroup.get('email').value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          console.log('Forgot result: ', value);
          this.isFetching = false;
          this.access_token = value.access_token;
          this.message = value.message;
        },
        error => {
          this.isFetching = false;
          this.error = error;
        });
  }

  onRestorePasswordClicked() {
    this.formSubmitted = true;
    this.isFetching = true;

    this.auth.resetPasswordViaEmail(this.tokenToRestore, this.passwordFormGroup.get('password').value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          console.log('Restore password result: ', value);
          this.isFetching = false;
          this.access_token = value.access_token;
          this.message = value.message;
        },
        error => {
          this.isFetching = false;
          this.error = error;
        });
  }

  onSignInClicked() {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }

  onGoBackClicked() {
    this.dialogRef.close();
    this.router.navigate(['/landing']);
  }
}
