import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RESTAURANT_BY_CUISINE, RESTAURANT_BY_ID_URL, RESTAURANT_URL } from '../constants/urls';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IRestaurant } from '../shared/models/Interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  restaurantCount$: Observable<number> = this.restaurantCountSubject.asObservable();

  private restaurantsSubject: BehaviorSubject<IRestaurant[]> = new BehaviorSubject<IRestaurant[]>([]);
  restaurants$: Observable<IRestaurant[]> = this.restaurantsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRestaurant(): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(RESTAURANT_URL)
  }

  getRestaurantByID(restaurantId: string): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(`${RESTAURANT_BY_ID_URL}/${restaurantId}`, { responseType: 'json' });
  }

  getRestaurantByCuisine(cuisine: string) {
    return this.http.get(`&${RESTAURANT_BY_CUISINE}/${cuisine}`)
  }

  updateRestaurantCount(count: number): void {
    this.restaurantCountSubject.next(count);
  }

  updateRestaurant(restaurants: IRestaurant[]): void {
    this.restaurantsSubject.next(restaurants)
  }

  postRestaurant(restaurants: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(RESTAURANT_URL, restaurants)
  }

  DeleteRestaurant(rest: any) {
    return this.http.delete(`${RESTAURANT_URL}/${rest.id}`)
  }
  UpdateRestaurant(rest: IRestaurant) {
    return this.http.put(`${RESTAURANT_URL}/${rest.id}`, rest)
  }
}