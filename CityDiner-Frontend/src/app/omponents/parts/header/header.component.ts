import { Component } from '@angular/core';
import { CartServService } from 'src/app/service/cart-serv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  quantity = 0;

  constructor(private cartServ: CartServService) {
    cartServ.getCartObservable().subscribe(res => {
      this.quantity = res.totalCount
    })
  }
}
