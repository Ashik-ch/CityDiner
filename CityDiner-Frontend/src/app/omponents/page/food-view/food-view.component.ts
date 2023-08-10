import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServService } from 'src/app/service/cart-serv.service';
import { FoodService } from 'src/app/service/food.service';
import { IFood } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.scss']
})
export class FoodViewComponent implements OnInit {

  foods: any
  foodid: string = ''
  loading: boolean = true
  deletedFood: any
  imageUrl = 'https://stormid.com/university-study/static/img/ppc-st-andrews.jpg'

  constructor(private foodServ: FoodService, activateRoute: ActivatedRoute,
    private cartService: CartServService, private route: Router) {
    activateRoute.params.subscribe(params => {
      this.foodServ.getFoodbyId(params['foodid']).subscribe((res: IFood) => {
        this.foods = res
        this.foodid = this.foods.id
        this.loading = false

      })
    })
  }

  ngOnInit() { }

  /**@description Function for add Food  to cart and navigate to Store page */
  AddToCart() {
    this.cartService.addToCart(this.foods)
    this.route.navigateByUrl('/store')
  }

  /**@description Function for delete Food form the list */
  deleteFood() {
    this.foodServ.deleteFoodItem(this.foodid)
      .subscribe((res) => {
        this.deletedFood = res
        this.deletedFood = this.deletedFood.msg
        this.route.navigateByUrl('/food')
      })
  }
}
