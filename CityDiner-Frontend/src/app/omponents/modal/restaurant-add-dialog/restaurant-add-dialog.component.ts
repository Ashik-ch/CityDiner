import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-add-dialog',
  templateUrl: './restaurant-add-dialog.component.html',
  styleUrls: ['./restaurant-add-dialog.component.scss']
})

export class RestaurantAddDialogComponent {

  RestaurantForm: FormGroup;
  buttonLabel: string = 'Add Restaurant'

  constructor(
    public dialogRef: MatDialogRef<RestaurantAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    if (data.restaurant) {
      data = data.restaurant;
      this.buttonLabel = 'Update Restaurant';
      this.RestaurantForm.setValue({
        name: data.name,
        place: data.place,
        imageUrl: data.imageUrl,
        cuisine: data.cuisine,
        openingtime: data.openingtime,
        AdressLong: data.AdressLong ?? "custom",
        AddressLat: data.AddressLat ?? "custom",
      })
    }
  }

  OnSubmit() {
    const formvalue = this.RestaurantForm.value
    console.log("formvalue", formvalue);
    if (this.data) {
      this.dialogRef.close(formvalue);
    }
    if (this.RestaurantForm.valid) {
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