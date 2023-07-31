import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { foodItems } from 'src/data';

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

}
