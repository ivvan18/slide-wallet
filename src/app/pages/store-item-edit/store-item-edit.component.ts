import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {finalize, takeUntil} from 'rxjs/operators';
import {Location} from '@angular/common';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-store-item-edit',
  templateUrl: './store-item-edit.component.html',
  styleUrls: ['./store-item-edit.component.scss']
})
export class StoreItemEditComponent implements OnInit, OnDestroy {
  storeItemEditFromGroup: FormGroup;
  itemId: string;
  isLoading = true;
  error = '';
  isNewEntity = false;
  isFetching = false;
  formSubmitted = false;
  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<StoreItemEditComponent>,
    private rest: RestService,
    private router: Router,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.storeItemEditFromGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.maxLength(300)],
      price: ['']
    });

    this.storeItemEditFromGroup.valueChanges.subscribe(() => (this.formSubmitted = false));

    console.log(this.data);

    this.itemId = this.data['id'];
    this.isNewEntity = this.itemId === 'new';
    this.isLoading = !this.isNewEntity;

    if (!this.isNewEntity) {
      this.rest.getEntities('shop')
        .pipe(
          finalize(() => this.isLoading = false),
          takeUntil(this.destroy$)
        ).subscribe(store => {
          console.log('Store: ', store);
          console.log('ItemId: ', this.itemId);
          store.items.forEach(item => {
            if (String(item.id) === this.itemId) {
              this.storeItemEditFromGroup.setValue({
                name: item.name,
                description: item.description,
                price: item.price
              });
            }
          });
         });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isNameValid(): boolean {
    return this.storeItemEditFromGroup.get('name').valid;
  }

  isDescriptionValid(): boolean {
    return this.storeItemEditFromGroup.get('description').valid;
  }

  onActionClicked() {
    this.formSubmitted = true;
    this.isFetching = true;
    this.error = '';

    console.log('onActionClicked: ');
    this.rest.postEntity(this.isNewEntity ? 'shop/additem' : 'updateitem', this.isNewEntity ?
      this.storeItemEditFromGroup.getRawValue() : { id: this.itemId, ...this.storeItemEditFromGroup.getRawValue()})
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        value => {
          console.log('Action Success: ', value);
          this.isFetching = false;
          this.onCloseDialogClicked();
        },
        error => {
          console.log('Action Error: ', error);
          this.isFetching = false;
          this.error = error.error.message;
        });
  }

  onCloseDialogClicked() {
    this.dialogRef.close();
    this.location.back();
  }
}
