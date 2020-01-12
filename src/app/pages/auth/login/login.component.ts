import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInFormGroup: FormGroup;
  hidePassword = true;
  error = '';
  isFetching = false;
  formSubmitted = false;
  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signInFormGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.signInFormGroup.valueChanges.subscribe(() => (this.formSubmitted = false));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isEmailValid(): boolean {
    return this.signInFormGroup.get('login').valid;
  }

  onSignInClicked() {
    this.formSubmitted = true;
    this.isFetching = true;
    this.error = '';

    console.log('onSignInClicked: ', this.auth);
    this.auth.login(this.signInFormGroup.getRawValue())
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        value => {
        console.log('Login Success: ', value);
        this.isFetching = false;
      },
          error => {
            console.log('Login Error: ', error);
            this.isFetching = false;
            this.error = error.error.message;
      });
  }

  onRegisterClicked() {
    this.dialogRef.close();
    this.router.navigate(['/auth/register']);
  }

  onRestorePasswordClicked() {
    this.dialogRef.close();
    this.router.navigate(['/auth/restore-password']);
  }
}
