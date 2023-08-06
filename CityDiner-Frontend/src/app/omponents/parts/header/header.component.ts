import { Component } from '@angular/core';
import { CartServService } from 'src/app/service/cart-serv.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  quantity = 0;
  restaurantCount: number = 0;

  constructor(private cartServ: CartServService, private restaurantServ: RestaurantService) {
    cartServ.getCartObservable().subscribe(res => {
      this.quantity = res.totalCount
    })
  }

  ngOnInit(): void {
    this.restaurantServ.restaurantCount$.subscribe((count: number) => {
      this.restaurantCount = count;
    });
  }
}
