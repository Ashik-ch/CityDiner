import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-food-add-dialog',
  templateUrl: './food-add-dialog.component.html',
  styleUrls: ['./food-add-dialog.component.scss']
})
export class FoodAddDialogComponent {

  FoodForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FoodAddDialogComponent>,
    private fb: FormBuilder
  ) {
    this.FoodForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      imageUrl: ['', Validators.required],
      restaurant: ['', Validators.required],
      category: ['', Validators.required],
      favourite: ['', Validators.required],
    })
  }

  onSubmit() {
    const fv = this.FoodForm.value
    const newfood = {
      id: '1',
      name: fv.name,
      price: fv.price,
      imageUrl: fv.imageUrl,
      tags: fv.tags,
      restaurant: fv.restaurant,
      favourite: true,
    }
    this.dialogRef.close(newfood)
  }

  onCancel() {
    this.dialogRef.close();
  }
}
