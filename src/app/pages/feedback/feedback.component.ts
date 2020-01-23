import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedbackFormGroup: FormGroup;
  error = '';
  isFetching = false;
  formSubmitted = false;
  successMessage = '';
  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FeedbackComponent>,
    private rest: RestService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.feedbackFormGroup = this.formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.feedbackFormGroup.valueChanges.subscribe(() => (this.formSubmitted = false));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSendFeedbackClicked() {
    this.formSubmitted = true;
    this.isFetching = true;
    this.error = '';

    console.log('onSendFeedbackClicked: ', this.feedbackFormGroup.getRawValue());
    this.rest.postEntity('support', this.feedbackFormGroup.getRawValue().message)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        value => {
          console.log('Feedback Success: ', value);
          this.isFetching = false;
          this.successMessage = value.message;
        },
        error => {
          console.log('Feedback Error: ', error);
          this.isFetching = false;
          this.error = error.error.message;
        });
  }

  onCloseDialogClicked() {
    this.dialogRef.close();
    this.router.navigate(['/landing']);
  }
}
