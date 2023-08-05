import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

  food: Food[] = []
  imageUrl = 'https://stormid.com/university-study/static/img/ppc-st-andrews.jpg'
  loading: boolean = true

  constructor(private foodServ: FoodService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFoodData()
  }

  getFoodData() {
    let foodObservable: Observable<Food[]>;
    this.activateRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        foodObservable = this.foodServ.getfoodbySearch(params['searchTerm'])
      }
      else if (params['cat']) {
        foodObservable = this.foodServ.getAllFoodbyCategory(params['cat'])
      }
      else {
        foodObservable = this.foodServ.getAllFood()
      }
      foodObservable.subscribe(res => {
        this.food = res
        this.loading = false;
      })
    })
  }

}
