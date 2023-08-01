import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.scss']
})
export class FoodViewComponent implements OnInit {
  food: Food[] = []
  foods: any

  constructor(private foodServ: FoodService, activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(params => {
      this.foods = this.foodServ.getFoodbyId(params['foodid'])
    })


  }

  ngOnInit() {
  }

}
