import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/service/food.service';
import { Category } from 'src/app/shared/models/Interface';

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
    this.foodServ.getAllCategory().subscribe(res => {
      this.categories = res
    })
  }


}
