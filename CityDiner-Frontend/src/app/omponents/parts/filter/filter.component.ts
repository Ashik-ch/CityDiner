import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/food.service';
import { Category } from 'src/app/shared/models/food';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories: Category[] = []
  constructor(private foodServ: FoodService) {
  }

  ngOnInit(): void {
    this.categories = this.foodServ.getAllCategory()
  }


}
