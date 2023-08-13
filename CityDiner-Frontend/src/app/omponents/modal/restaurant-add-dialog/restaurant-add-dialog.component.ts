import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRestaurant } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-restaurant-add-dialog',
  templateUrl: './restaurant-add-dialog.component.html',
  styleUrls: ['./restaurant-add-dialog.component.scss']
})

export class RestaurantAddDialogComponent {

  RestaurantForm: FormGroup;
  buttonLabel: string = 'Add Restaurant'
  mode: string = '';

  constructor(public dialogRef: MatDialogRef<RestaurantAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRestaurant,
    private fb: FormBuilder
  ) {
    this.RestaurantForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required,]],
      place: ['', [Validators.required]],
      imageUrl: ['', Validators.required],
      cuisine: ['', Validators.required],
      openingtime: ['', [Validators.required]],
      closingtime: ['', [Validators.required]],
      AdressLong: ['', [Validators.required]],
      AddressLat: ['', [Validators.required]],
    })

    if (data) {

      this.mode = 'edited'
      this.buttonLabel = 'Update Restaurant';
      this.RestaurantForm.setValue({
        id: data.id,
        name: data.name,
        place: data.place,
        imageUrl: data.imageUrl,
        cuisine: data.cuisine,
        openingtime: data.openingtime,
        closingtime: data.closingtime,
        AdressLong: data.AdressLong,
        AddressLat: data.AddressLat,
      })
    }
  }

  OnSubmit() {
    const formvalue = this.RestaurantForm.value
    if (this.data) {
      this.dialogRef.close({ formvalue, mode: this.mode });
    }
    else if (this.RestaurantForm.valid && !this.data) {
      this.dialogRef.close(formvalue);
    }
    else {
      alert("invalid Form")
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}