import { Injectable } from '@angular/core';
import { Category, Food } from '../shared/models/food';
// import { category, foodItems } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_CATEGORY, FOOD_BY_ID, FOOD_BY_SEARCH, FOOD_CATEGORY, FOOD_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  /**@description Get all Food */
  getAllFood(): Observable<Food[]> {            //datatype
    return this.http.get<Food[]>(FOOD_URL)
  }

  /** @description for searching Foods  @param searchTerm The keyword for searching */
  getfoodbySearch(searchTerm: string) {
    return this.http.get<Food[]>(FOOD_BY_SEARCH + searchTerm)
  }

  /** @description for Filter tags */
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(FOOD_CATEGORY)
  }

  /** @description for Filter Foods by category  @param cat categories */
  getAllFoodbyCategory(cat: string): Observable<Food[]> {
    return cat == "All" ? this.getAllFood() :
      this.http.get<Food[]>(FOOD_BY_CATEGORY + cat)
  }

  /** @description for paramsView of Foods  @param foodId ID of Food */
  getFoodbyId(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID + foodId)
  }
}
