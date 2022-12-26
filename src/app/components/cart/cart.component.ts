import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AddToCartWarningModalService } from 'src/app/services/modals/add-to-cart/add-to-cart-warning-modal.service';
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

  @ViewChild('addToCartWarningModal', { read: ViewContainerRef })
  addToCartWarningEntry!: ViewContainerRef;
  addToCartWarningSoapSub!: Subscription;

  constructor(private cartService : CartService, 
    private _userService: UserService, 
    private router: Router, 
    private _addToCartWarningModal: AddToCartWarningModalService) { 
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
      this.addToCartWarningSoapSub = this._addToCartWarningModal
      .openModal(this.addToCartWarningEntry)
      .subscribe((status) => {
        if(status) {
          this.router.navigate(['/signin']);
        }
      });
    } else {
      alert('ok, gi kupi ovie ajtemi')
    }
  }

}
