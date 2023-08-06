import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RESTAURANT_URL } from '../constants/urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRestaurant } from '../shared/models/Interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  restaurantCount$: Observable<number> = this.restaurantCountSubject.asObservable();


  constructor(private http: HttpClient) { }

  getRestaurant(): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(RESTAURANT_URL)
  }
  updateRestaurantCount(count: number): void {
    this.restaurantCountSubject.next(count);
  }
  postRestaurant(restaurants: any) {
    console.log("restaurants", restaurants);

    return this.http.post(RESTAURANT_URL, restaurants)

  }
}