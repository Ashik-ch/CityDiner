import { Component } from '@angular/core';
import { CartServService } from 'src/app/service/cart-serv.service';
import { Cart, CartItem } from 'src/app/shared/models/food';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  cart!: Cart;
  imageUrl = 'https://i.imgur.com/dCdflKN.png';

  constructor(private cartServ: CartServService) {
    this.cartServ.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartServ.removeFromCart(cartItem.food.id);
  }

  changeTheQuantity(cartItem: CartItem, quantityinString: string) {
    const quantity = parseInt(quantityinString);
    this.cartServ.changeQuantity(cartItem.food.id, quantity);
  }

  clearStore() {
    this.cartServ.clearCart();
  }
}
