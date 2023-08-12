import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/service/food.service';
import { IFood } from 'src/app/shared/models/Interface';
import { FoodAddDialogComponent } from '../../modal/food-add-dialog/food-add-dialog.component';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.scss']
})
export class FoodTableComponent implements OnInit {
  foods!: any

  constructor(private foodServ: FoodService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getfoodlist()
  }

  getfoodlist() {
    this.foodServ.getAllFood().subscribe((res) => {
      this.foods = res
    })
  }

  onDelete(food: IFood) {
    console.log('clicked');
    this.foodServ.deleteFoodItem(food.id).subscribe(res => {
      console.log(res);
      this.getfoodlist()
    })
  }

  openFoodDialog(food?: IFood) {

    const dialogRef = this.dialog.open(FoodAddDialogComponent, {
      width: '750px',
      disableClose: true,
      data: food
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (food) {
          this.foodServ.editFood(result).subscribe((res) => {
            console.log("edited:", res);
          });
        }
        else {
          const newfood = result;
          this.foodServ.postFood(newfood).subscribe((res) => {
            console.log("updates:", res);
          });
        }
      }
    })
  }
}

