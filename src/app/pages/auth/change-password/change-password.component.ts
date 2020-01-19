import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  passwordFormGroup: FormGroup;
  error = '';
  isFetching = false;
  successMessage = '';
  formSubmitted = false;
  hideCurrentPassword = true;
  hidePassword = true;
  hidePasswordRepeat = true;
  repeatPasswordMatcher = new RepeatPasswordMatcher();

  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
  ) { }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group(
      {
        current_password: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['']
      },
      {validator: checkPasswords}
    );

    this.passwordFormGroup.valueChanges.subscribe(
      value => (this.formSubmitted = false)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isCurrentPasswordValid(): boolean {
    return this.passwordFormGroup.get('current_password').valid;
  }

  isPasswordValid(): boolean {
    return this.passwordFormGroup.get('password').valid;
  }

  onChangePasswordClicked() {
    this.formSubmitted = true;
    this.isFetching = true;
    this.error = '';

    this.auth.changePassword(this.passwordFormGroup.get('current_password').value, this.passwordFormGroup.get('password').value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (value: any) => {
          console.log('Change password success: ', value);
          this.isFetching = false;
          this.successMessage = value.message;
        },
        error => {
          console.log('Change password error: ', error);
          this.isFetching = false;
          this.error = error.error.message;
        });
  }

  onCloseDialogClicked() {
    this.dialogRef.close();
    this.router.navigate(['/landing']);
  }
}
