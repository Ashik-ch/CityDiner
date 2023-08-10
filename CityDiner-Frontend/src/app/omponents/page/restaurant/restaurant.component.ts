import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';
import { RestaurantAddDialogComponent } from '../../modal/restaurant-add-dialog/restaurant-add-dialog.component';

import { MatDialog, } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: IRestaurant[] = [];

  constructor(private restaurantServ: RestaurantService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getRestaurantAll()
  }

  getRestaurantAll() {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res;
      this.restaurantServ.updateRestaurantCount(res.length); // Update the count using BehaviorSubject
      this.restaurantServ.updateRestaurant(res);
      console.log(this.restaurants);
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(RestaurantAddDialogComponent, {
      height: '600px',
      width: '750px',
      disableClose: true, // prevents closing the dialog by clicking outside
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantServ.postRestaurant(result).subscribe(
          () => {
            this.getRestaurantAll()
          },
          (error => {
            alert(error.error.msg)
          }))
      }
    });
  }
}

