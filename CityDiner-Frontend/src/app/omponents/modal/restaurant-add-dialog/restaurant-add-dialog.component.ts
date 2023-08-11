import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-add-dialog',
  templateUrl: './restaurant-add-dialog.component.html',
  styleUrls: ['./restaurant-add-dialog.component.scss']
})

export class RestaurantAddDialogComponent {

  RestaurantForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RestaurantAddDialogComponent>,
    private fb: FormBuilder) {
    this.RestaurantForm = this.fb.group({
      name: ['', [Validators.required,]],
      place: ['', [Validators.required]],
      imageUrl: ['', Validators.required],
      cuisine: ['', Validators.required],
      openingtime: ['', [Validators.required, Validators.pattern('^[0-9*]+$')]],
      AdressLong: ['', Validators.required],
      AddressLat: ['', Validators.required],
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  OnSubmit() {
    console.log(this.RestaurantForm.value);
    if (this.RestaurantForm.valid) {
      const formvalue = this.RestaurantForm.value
      this.dialogRef.close(formvalue);
    }
    else {
      alert("invalid Form")
    }
  }
}