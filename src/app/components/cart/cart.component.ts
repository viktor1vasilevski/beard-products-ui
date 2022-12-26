import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  public isCustomerLogged: boolean = false;

  constructor(private cartService : CartService, 
    private _userService: UserService, 
    private router: Router) { 
    this._userService.isCustomerLogged.subscribe(status => {
      this.isCustomerLogged = status;
    })
  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }

  checkOut() {
    if(!this.isCustomerLogged) {
      //this.router.navigate(['/signin'])
      alert('u need to first login')
    } else {
      alert('ok u are signed in')
    }
  }

}
