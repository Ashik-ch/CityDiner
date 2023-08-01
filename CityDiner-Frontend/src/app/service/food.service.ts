import { Injectable } from '@angular/core';
import { Category, Food } from '../shared/models/food';
import { category, foodItems } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  /**@description Get all Food */
  getAllFood(): Food[] {            //datatype
    return foodItems
  }

  /** * @description for searching Foods  @param searchTerm The keyword for searching */
  getfoodbySearch(searchTerm: string) {
    return this.getAllFood().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllCategory(): Category[] {
    return category
  }

  /** * @description for Filter  Foods by category  @cat categories */
  getAllFoodbyCategory(cat: string) {
    return cat == "All" ?
      this.getAllFood() :
      this.getAllFood().filter(categ => categ.tags?.includes(cat))
  }

}
