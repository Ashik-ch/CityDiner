import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: IRestaurant[] = [];

  constructor(private restaurantServ: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurantAll()
  }

  getRestaurantAll() {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res;
      this.restaurantServ.updateRestaurantCount(res.length); // Update the count using BehaviorSubject
      this.restaurantServ.updateRestaurant(res);
    });
  }


}

