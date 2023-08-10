import { Injectable } from '@angular/core';
import { Category, IFood } from '../shared/models/Interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_CATEGORY, FOOD_BY_ID, FOOD_BY_SEARCH, FOOD_CATEGORY, FOOD_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  /**@description Get all Food */
  getAllFood(): Observable<IFood[]> {            //datatype
    return this.http.get<IFood[]>(FOOD_URL)
  }

  /**@description AddFooditmes */
  postFood(food: IFood) {
    return this.http.post(FOOD_URL, food)
  }

  /** @description for searching Foods  @param searchTerm The keyword for searching */
  getfoodbySearch(searchTerm: string) {
    return this.http.get<IFood[]>(FOOD_BY_SEARCH + searchTerm)
  }

  /** @description for Filter tags */
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(FOOD_CATEGORY)
  }

  /** @description for Filter Foods by category  @param cat categories */
  getAllFoodbyCategory(cat: string): Observable<IFood[]> {
    return cat == "All" ? this.getAllFood() :
      this.http.get<IFood[]>(FOOD_BY_CATEGORY + cat)
  }

  /** @description for paramsView of Foods  @param foodId ID of Food */
  getFoodbyId(foodId: string): Observable<IFood> {
    return this.http.get<IFood>(FOOD_BY_ID + foodId)
  }

  /** @description for Delete foodItem  @param foodId Foods */
  deleteFoodItem(foodId: string) {
    console.log("foodid", foodId);
    return this.http.delete(FOOD_BY_ID + foodId)

  }
}
