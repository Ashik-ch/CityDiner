import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './omponents/parts/header/header.component';
import { HomeComponent } from './omponents/page/home/home.component';
import { SearchbarComponent } from './omponents/parts/searchbar/searchbar.component';
import { FoodComponent } from './omponents/page/food/food.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food', component: FoodComponent },
  { path: 'food/:searchTerm', component: FoodComponent },
];


const Components = [
  HeaderComponent,
  HomeComponent,
  SearchbarComponent,
  FoodComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    Components,

  ],
  imports: [
    BrowserModule,

    RouterModule.forRoot(routes),
  ],

  exports: [RouterModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
