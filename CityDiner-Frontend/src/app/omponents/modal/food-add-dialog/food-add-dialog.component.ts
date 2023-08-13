import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFood } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-food-add-dialog',
  templateUrl: './food-add-dialog.component.html',
  styleUrls: ['./food-add-dialog.component.scss']
})
export class FoodAddDialogComponent {

  FoodForm: FormGroup;
  Buttonlabel: string = 'Add Food'

  constructor(public dialogRef: MatDialogRef<FoodAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFood,
    private fb: FormBuilder,
  ) {
    this.FoodForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      imageUrl: ['', Validators.required],
      restaurant: ['', Validators.required],
      category: ['', Validators.required],
    })
    if (data) {
      this.Buttonlabel = "Update Food"
      this.FoodForm.setValue({
        id: data.id,
        name: data.name,
        price: data.price,
        tags: data.tags,
        imageUrl: data.imageUrl,
        restaurant: data.restaurant,
        category: data.category,
      });
    }
  }

  onSubmit() {
    const formData = this.FoodForm.value

    if (this.data) {
      this.dialogRef.close(formData);
    } else {
      const newFood = { ...formData, id: 'new-id', favourite: true };
      this.dialogRef.close(newFood)
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
