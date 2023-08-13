import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';
import { RestaurantAddDialogComponent } from '../../modal/restaurant-add-dialog/restaurant-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss']
})
export class RestaurantTableComponent implements OnInit {

  restaurants!: any

  constructor(private restaurantServ: RestaurantService,
    public dialog: MatDialog) {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res
    })


  }

  ngOnInit(): void { }

  openRestaurantDialog(restaurant?: IRestaurant) {
    const dialogRef = this.dialog.open(RestaurantAddDialogComponent, {
      width: '750px',
      disableClose: true, // prevents closing the dialog by clicking outside
      data: { restaurant }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantServ.postRestaurant(result).subscribe(
          (res) => {
            console.log(res);
          },
          (error => {
            alert(error.error.msg)
          }))
      }
    });
  }


  onDelete(rest: IRestaurant) {
    this.restaurantServ.DeleteRestaurant(rest).subscribe(res => {
      console.log(res);
      alert(res)
    })
  }

}
