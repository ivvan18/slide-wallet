import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerFormGroup: FormGroup;
  error = '';
  isFetching = false;
  access_token = '';
  formSubmitted = false;
  hidePassword = true;
  hidePasswordRepeat = true;
  repeatPasswordMatcher = new RepeatPasswordMatcher();
  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<RegisterComponent>,
  ) {}

  ngOnInit() {
    this.registerFormGroup = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['']
      },
      {validator: checkPasswords}
    );

    this.registerFormGroup.valueChanges.subscribe(
      value => (this.formSubmitted = false)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isEmailValid(): boolean {
    return this.registerFormGroup.get('email').valid;
  }

  isPasswordValid(): boolean {
    return this.registerFormGroup.get('password').valid;
  }

  onRegisterClicked() {
    this.formSubmitted = true;
    this.isFetching = true;
    this.error = '';

    this.auth.register(this.registerFormGroup.getRawValue())
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          console.log('Register Success: ', value);
          this.isFetching = false;
          this.access_token = value.access_token;
        },
        error => {
          console.log('Register Error: ', error);
          this.isFetching = false;
          this.error = error.error.message;
        });
  }

  onGoBackClicked() {
    this.dialogRef.close();
    this.router.navigate(['/landing']);
  }

  onSignInClicked() {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }
}
