import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: IRestaurant[] = [];
  cuisines: any[] = []

  constructor(private restaurantServ: RestaurantService, private router: Router,) { }

  ngOnInit(): void {
    this.getRestaurantAll()
  }

  getRestaurantAll() {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res;
      this.restaurantServ.updateRestaurantCount(res.length); // Update the count using BehaviorSubject
      this.restaurantServ.updateRestaurant(res);

      const cuisnersArray = this.restaurants.map((element: IRestaurant) => element.cuisine)
      const uniqueCuisinesSet = new Set(cuisnersArray.flat());
      this.cuisines = ['All', ...Array.from(uniqueCuisinesSet)];
    });
  }

  isRestaurantpage() {
    return this.router.url.includes('/restaurant');
  }

  onFilterCuisine(Filterterm: any) {
    if (Filterterm != "All") {
      this.restaurantServ.getRestaurant().subscribe((res: any) => {
        const Cuisine = res.filter((item: any) => {
          return item.cuisine == Filterterm
        })
        this.restaurants = Cuisine
      })
    }
    else {
      this.getRestaurantAll();
    }
  }

}

