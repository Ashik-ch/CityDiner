import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { IFood } from 'src/app/shared/models/Interface';
import { FoodAddDialogComponent } from '../../modal/food-add-dialog/food-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

  food: IFood[] = []
  imageUrl = 'https://stormid.com/university-study/static/img/ppc-st-andrews.jpg'
  loading: boolean = true
  FoodForm!: FormGroup

  showForm = false;

  constructor(private foodServ: FoodService, private activateRoute: ActivatedRoute, private fb: FormBuilder, public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.getFoodData()
  }

  getFoodData() {
    let foodObservable: Observable<IFood[]>;
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
