import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { IRestaurant } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: IRestaurant[] = [];
  RestaurantForm: FormGroup;

  constructor(private restaurantServ: RestaurantService, private fb: FormBuilder) {
    this.RestaurantForm = this.fb.group({
      name: ['', [Validators.required,]],
      place: ['', [Validators.required]],
      imageUrl: ['', Validators.required],
      cuisine: ['', Validators.required],
      openingtime: ['', [Validators.required, Validators.pattern('^[0-9*]+$')]]
    })
  }

  ngOnInit(): void {
    this.getRestaurantAll()
  }

  getRestaurantAll() {
    this.restaurantServ.getRestaurant().subscribe((res: any) => {
      this.restaurants = res;
      this.restaurantServ.updateRestaurantCount(res.length); // Update the count using BehaviorSubject
      this.restaurantServ.updateRestaurant(res);
      console.log(this.restaurants);
    });
  }

  OnSubmit() {
    const formvalue = this.RestaurantForm.value
    const restaurant: IRestaurant = {
      name: formvalue.name,
      place: formvalue.place,
      imageUrl: formvalue.imageUrl,
      cuisine: formvalue.cuisine,
      openingtime: formvalue.openingtime
    }

    if (this.RestaurantForm.valid)
      this.restaurantServ.postRestaurant(restaurant).subscribe(
        (res) => {
          this.getRestaurantAll()
        },
        (error => {
          alert(error.error.msg)
        }))
  }






}
