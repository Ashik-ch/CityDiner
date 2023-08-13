import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './omponents/parts/header/header.component';
import { HomeComponent } from './omponents/page/home/home.component';
import { SearchbarComponent } from './omponents/parts/searchbar/searchbar.component';
import { FoodComponent } from './omponents/page/food/food.component';
import { FilterComponent } from './omponents/parts/filter/filter.component';
import { FoodViewComponent } from './omponents/page/food-view/food-view.component';
import { StoreComponent } from './omponents/page/store/store.component';
import { TitleComponent } from './omponents/parts/title/title.component';
import { NotFoundComponent } from './omponents/parts/not-found/not-found.component';
import { LoginModule } from './login/login.module';
import { UserRegisterComponent } from './omponents/page/user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './omponents/parts/loading/loading.component';
import { RestaurantComponent } from './omponents/page/restaurant/restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantAddDialogComponent } from './omponents/modal/restaurant-add-dialog/restaurant-add-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { FoodAddDialogComponent } from './omponents/modal/food-add-dialog/food-add-dialog.component';
import { RestaurantViewComponent } from './omponents/page/restaurant-view/restaurant-view.component';
import { MapComponent } from './omponents/page/map/map.component';
import { AuthGuard } from './auth/auth.guard';
import { FoodTableComponent } from './omponents/page/food-table/food-table.component';
import { RestaurantTableComponent } from './omponents/page/restaurant-table/restaurant-table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant/:restaurantid', component: RestaurantViewComponent, canActivate: [AuthGuard] },
  { path: 'food', component: FoodComponent },
  { path: 'search/:searchTerm', component: FoodComponent },
  { path: 'category/:cat', component: FoodComponent },
  { path: 'food/:foodid', component: FoodViewComponent, canActivate: [AuthGuard] },
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', loadChildren: () => LoginModule },
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchbarComponent,
    FoodComponent,
    FilterComponent,
    FoodViewComponent,
    TitleComponent,
    StoreComponent,
    NotFoundComponent,
    UserRegisterComponent,
    LoadingComponent,
    RestaurantComponent,
    RestaurantAddDialogComponent,
    FoodAddDialogComponent,
    RestaurantViewComponent,
    MapComponent,
    FoodTableComponent,
    RestaurantTableComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],

  exports: [RouterModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
