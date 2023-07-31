import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

  food: Food[] = []

  constructor(private foodServ: FoodService, activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.food = this.foodServ.getfoodbySearch(params['searchTerm'])
      }
      else {
        this.food = this.foodServ.getAllFood()
      }
    })
  }

  ngOnInit(): void {
  }


}
