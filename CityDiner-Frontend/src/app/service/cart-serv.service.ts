import { Injectable } from '@angular/core';
import { Cart, CartItem, Food } from '../shared/models/food';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServService {
  private store: Cart = this.getCartFromLocalStorage();        //initialiing store from local strorage         
  // cart: Cart = new Cart()

  /** @description behaviourSubject of store. i.e it emmits stores  where subject is called */
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.store)

  constructor() { }

  /**Service Fucntion for adding food to cart */
  addToCart(food: Food): void {
    let cartItem = this.store.items.find(item => item.food.id === food.id);
    if (cartItem)
      return;
    this.store.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  /**Removing item from Cart */
  removeFromCart(foodId: string): void {
    this.store.items = this.store.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.store.items.find(item => item.food.id === foodId);
    if (!cartItem)
      return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.store = new Cart();
    this.setCartToLocalStorage();
  }

  /**@description Function for call behaviorSubject of Store. i.e it emmits stores  where subject is called  */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }


  /**@description Setting  store in LocalStorage */
  private setCartToLocalStorage(): void {    //store total price using reduce function
    this.store.totalPrice = this.store.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.store.totalCount = this.store.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    localStorage.setItem('Cart', JSON.stringify(this.store));
    this.cartSubject.next(this.store);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();  //if cartJson(-this,store) is not in localstorage then set new cart() (-empty)
  }
}


