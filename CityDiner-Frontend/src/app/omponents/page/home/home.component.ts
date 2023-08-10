import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/service/food.service';
import { IFood } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  food: IFood[] = []
  constructor(private foodServ: FoodService) { }

  ngOnInit(): void {
  }

}
