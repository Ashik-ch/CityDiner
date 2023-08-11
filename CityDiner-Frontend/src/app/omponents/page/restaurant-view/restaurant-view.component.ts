import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
})
export class RestaurantViewComponent implements OnInit {

  @Input() latitude = 0
  @Input() longitude = 0

  restaurantID: string = ''
  selectedRestaurant!: IRestaurant;
  constructor(private activateroute: ActivatedRoute, private restaurantService: RestaurantService) {
    this.activateroute.params.subscribe((res: any) => {
      console.log(res.restaurantid);
      this.restaurantID = res.restaurantid
    })
  }

  ngOnInit(): void {

    this.restaurantService.getRestaurantByID(this.restaurantID).subscribe(res => {
      this.selectedRestaurant = res
      this.latitude = this.selectedRestaurant.AddressLat
      this.longitude = this.selectedRestaurant.AdressLong
    })
  }
}
