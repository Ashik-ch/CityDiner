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

  constructor(private restaurantServ: RestaurantService, public dialog: MatDialog) {
    this.getResraurant()
  }

  ngOnInit(): void { }

  getResraurant() {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res
    })
  }

  openRestaurantDialog(restaurant?: IRestaurant) {
    const dialogRef = this.dialog.open(RestaurantAddDialogComponent, {
      width: '750px',
      disableClose: true,
      data: restaurant
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.mode) {
        this.restaurantServ.UpdateRestaurant(result.formvalue).subscribe(res => {
          this.getResraurant()
        })
      }
      if (result && !result.mode) {
        this.restaurantServ.postRestaurant(result).subscribe(
          (res) => {
            console.log(res);
            this.getResraurant();
          },
          (error => {
            alert(error.error.msg)
          }))
      };
    })
  }


  onDelete(rest: IRestaurant) {
    this.restaurantServ.DeleteRestaurant(rest).subscribe(res => {
      console.log(res);
      alert(res)
    })
  }

  onSearch(searchterm: any) {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      const Searchresult = res.filter((element: IRestaurant) => {
        return element.name.toLowerCase().includes(searchterm.toLowerCase())
      });
      this.restaurants = Searchresult
    })
  }

}
